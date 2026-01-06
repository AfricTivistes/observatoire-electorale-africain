import React, { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content?: string;
}

interface CountryNewsProps {
  countryName: string;
  maxArticles?: number;
}

const CountryNews: React.FC<CountryNewsProps> = ({
  countryName,
  maxArticles = 2,
}) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(maxArticles);

  useEffect(() => {
    const fetchNews = async () => {
      if (!countryName) {
        setError("Nom du pays manquant");
        setLoading(false);
        return;
      }

      try {
        let query;

        if (countryName === "Guinée") {
          query = encodeURIComponent(
            `"élections présidentielles" OR "élections législatives" ${countryName} -Bissau, -équatoriale`,
          );
        } else {
          query = encodeURIComponent(
            `"élections présidentielles" OR "élections législatives" ${countryName}`,
          );
        }
        const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=fr&gl=FR&ceid=FR:fr`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.items?.length) {
          setError(`Aucune actualité trouvée pour "${countryName}".`);
          return;
        }

        setNewsItems(
          data.items.sort(
            (a, b) =>
              new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
          ),
        );
      } catch (err) {
        console.error("Erreur lors du chargement des actualités:", err);
        setError("Erreur lors du chargement des actualités.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [countryName]);

  const formatDate = (pubDate: string) => {
    return new Date(pubDate).toLocaleDateString("fr-FR", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const cleanHtml = (text: string) => {
    return text.replace(/<[^>]*>?/gm, "").trim();
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const loadMore = () => {
    setDisplayCount((prev) => prev + 2);
  };

  const showLess = () => {
    setDisplayCount(maxArticles);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-farafina-accent"></div>
        <p className="ml-3 text-farafina-accent">
          Chargement des actualités...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  const visibleNews = newsItems.slice(0, displayCount);
  const hasMore = newsItems.length > displayCount;
  const canShowLess = displayCount > maxArticles;

  return (
    <div className="space-y-4">
      {visibleNews.map((item, index) => {
        const cleanContent = cleanHtml(item.content || item.description || "");
        const shortTitle = truncateText(item.title, 100);
        const shortDescription = truncateText(cleanContent, 300);

        return (
          <div
            key={index}
            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            <h3 className="font-semibold text-farafina-dark hover:text-farafina-accent transition-colors">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2"
              >
                <span className="flex-1">{shortTitle}</span>
                <FaExternalLinkAlt className="text-xs text-gray-400 mt-1 flex-shrink-0" />
              </a>
            </h3>
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
              🗓️ {formatDate(item.pubDate)}
            </p>
            {cleanContent && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {shortDescription}
              </p>
            )}
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-farafina-accent hover:underline mt-2 inline-block"
            >
              Lire l'article complet
            </a>
          </div>
        );
      })}

      {(hasMore || canShowLess) && (
        <div className="flex gap-2">
          {hasMore && (
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-farafina-accent text-white rounded-lg hover:bg-farafina-accent/90 transition-colors flex-1"
            >
              Voir plus
            </button>
          )}
          {canShowLess && (
            <button
              onClick={showLess}
              className="px-4 py-2 border border-farafina-accent text-farafina-accent rounded-lg hover:bg-farafina-accent/10 transition-colors flex-1"
            >
              Voir moins
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CountryNews;
