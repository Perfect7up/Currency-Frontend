/* =========================
 * Core News Types
 * ========================= */

export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  summary: string;
  imageUrl: string;
  source: string;
  url: string;
  isFeatured: boolean;
  publishedAt: string; // ISO DateTime
}
