import { AstroError } from 'astro/errors';
import type { DataStore, Loader } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import type { z } from 'astro/zod';
import axios from 'axios';

type MapperFunction = (rawData: any) => any;

type NocoDBConfig = {
  baseUrl: string;
  apiKey: string;
  tables: Record<string, {
    tableId: string;
    schema: z.ZodObject<any>;
    queryParams?: Record<string, any>;
    bodyField?: string;
    fields?: string[];
    mapper?: MapperFunction;
    retries?: number;
    delay?: number;
  }>;
};

/* ============================================================
   GLOBAL RATE LIMITER
   Ensures only ONE HTTP request goes out at a time across ALL
   collections, with a mandatory gap between requests.
   This prevents 429 errors from NocoDB when Astro fetches
   multiple collections in parallel during build.
   ============================================================ */

const GLOBAL_MIN_DELAY_MS = 1500; // minimum 1.5s between any two API calls

let _lastRequestTime = 0;
let _requestQueue: Promise<void> = Promise.resolve();

/**
 * Wraps an async function so that it waits for all previous
 * requests to finish AND respects a minimum delay between calls.
 */
function rateLimitedFetch<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    _requestQueue = _requestQueue.then(async () => {
      const now = Date.now();
      const elapsed = now - _lastRequestTime;
      if (elapsed < GLOBAL_MIN_DELAY_MS) {
        await new Promise(r => setTimeout(r, GLOBAL_MIN_DELAY_MS - elapsed));
      }
      try {
        const result = await fn();
        _lastRequestTime = Date.now();
        resolve(result);
      } catch (err) {
        _lastRequestTime = Date.now();
        reject(err);
      }
    });
  });
}

/* ============================================================ */

export function nocodbCollections(config: NocoDBConfig) {
  const { baseUrl, apiKey, tables } = config;
  if (!baseUrl || !apiKey) {
    throw new AstroError('Missing baseUrl or apiKey in NocoDB config.');
  }
  const collections: Record<string, ReturnType<typeof defineCollection>> = {};

  for (const [name, { tableId, schema, queryParams = {}, bodyField = 'content', fields = [], mapper, retries = 10, delay = 2000 }] of Object.entries(tables)) {
    const apiUrl = new URL(`${baseUrl}/api/v2/tables/${tableId}/records`);
    collections[name] = defineCollection({
      schema,
      loader: makeLoader({ name: `nocodb-${name}`, url: apiUrl, apiKey, queryParams, bodyField, fields, mapper, retries, delay }),
    });
  }

  return collections;
}

function makeLoader({
  name,
  url,
  apiKey,
  queryParams,
  bodyField,
  fields,
  mapper,
  retries,
  delay
}: {
  name: string;
  url: URL;
  apiKey: string;
  queryParams: Record<string, any>;
  bodyField: string;
  fields: string[];
  mapper?: MapperFunction;
  retries: number;
  delay: number;
}): Loader {
  const loader: Loader = {
    name,
    async load({ store, parseData }) {
      console.log(`[${name}] Starting data fetch...`);
      const items = await fetchAll(name, url, apiKey, queryParams, fields, 0, [], retries, delay);
      console.log(`[${name}] Fetched ${items.length} records.`);
      for (const rawItem of items) {
        const mappedItem = mapper ? mapper(rawItem) : rawItem;
        const id = String(mappedItem.Id || mappedItem.id || 'unknown');
        const parsed = await parseData({ id, data: mappedItem });
        const storeEntry: Parameters<DataStore['set']>[0] = { id, data: parsed };
        if (parsed[bodyField]) {
          storeEntry.body = parsed[bodyField];
          delete parsed[bodyField];
        }
        store.set(storeEntry);
      }
    },
  };
  return loader;
}

async function fetchAll(
  loaderName: string,
  url: URL,
  apiKey: string,
  queryParams: Record<string, any>,
  fields: string[],
  offset = 0,
  results: any[] = [],
  retries: number,
  delay: number
): Promise<any[]> {
  const fetchUrl = new URL(url);
  const params: Record<string, any> = { ...queryParams, offset, limit: queryParams.limit || 100 };
  if (fields.length > 0) {
    params.fields = fields.join(',');
  }
  for (const [key, value] of Object.entries(params)) {
    fetchUrl.searchParams.set(key, String(value));
  }

  try {
    // All HTTP requests go through the global rate limiter
    const response = await rateLimitedFetch(() =>
      axios.get(fetchUrl.toString(), {
        headers: {
          'xc-token': apiKey,
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30s timeout per request
      })
    );

    if (response.status === 429) {
      return handle429(loaderName, url, apiKey, queryParams, fields, offset, results, retries, delay);
    }

    const data = response.data;
    const list = data.list || [];
    results.push(...list);

    const pageInfo = data.pageInfo || {};
    if (!pageInfo.isLastPage) {
      return fetchAll(loaderName, url, apiKey, queryParams, fields, offset + (queryParams.limit || 100), results, retries, delay);
    }

    return results;
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      return handle429(loaderName, url, apiKey, queryParams, fields, offset, results, retries, delay);
    } else {
      console.error(`[${loaderName}] Error fetching NocoDB records (offset=${offset}):`, error.message || error);
      return results;
    }
  }
}

async function handle429(
  loaderName: string,
  url: URL,
  apiKey: string,
  queryParams: Record<string, any>,
  fields: string[],
  offset: number,
  results: any[],
  retries: number,
  delay: number
): Promise<any[]> {
  if (retries > 0) {
    const waitTime = delay + Math.floor(Math.random() * 2000); // add jitter to avoid thundering herd
    console.warn(`[${loaderName}] Rate limited (429). Retry ${retries} remaining. Waiting ${waitTime}ms...`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    return fetchAll(loaderName, url, apiKey, queryParams, fields, offset, results, retries - 1, delay * 2);
  } else {
    console.error(`[${loaderName}] Exceeded retry limit for 429 error. Returning ${results.length} records collected so far.`);
    return results;
  }
}
