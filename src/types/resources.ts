
export interface Resource {
  id: string;
  title: string;
  type: string;
  year: number;
  description: string;
  Pays_id: string;
  fichier: string;
  category?: string;
  language?: string;
  downloadCount?: number;
  views?: number;
  publishedDate?: string;
  author?: string;
  tags?: string[];
}

export interface ResourceStats {
  totalResources: number;
  totalReports: number;
  totalGuides: number;
  totalDatasets: number;
  totalMedia: number;
  recentResources: number;
  downloadCount: number;
}

export interface ResourceCategory {
  name: string;
  count: number;
  icon: string;
  color: string;
  textColor: string;
  description: string;
}
