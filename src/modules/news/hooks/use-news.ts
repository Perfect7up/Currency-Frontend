import { useQuery } from '@tanstack/react-query';
import { newsApi } from '../api/news.api';
import type { NewsArticle } from '../types';

/**
 * Paginated news list
 */
export const useNews = (page?: number, limit?: number) =>
  useQuery({
    queryKey: ['news', page, limit],
    queryFn: async () => {
      const { data, error } = await newsApi.list(page, limit);
      if (error) throw error;
      return data as unknown as NewsArticle[];
    },
    staleTime: 60000,
  });

/**
 * Featured news
 */
export const useFeaturedNews = () =>
  useQuery({
    queryKey: ['featured-news'],
    queryFn: async () => {
      const { data, error } = await newsApi.featured();
      if (error) throw error;
      return data as unknown as NewsArticle[];
    },
    staleTime: 60000,
    retry: false,
  });

/**
 * Single news article
 */
export const useNewsById = (id: number | string) =>
  useQuery({
    queryKey: ['news', id],
    queryFn: async () => {
      const { data, error } = await newsApi.getById(id);
      if (error) throw error;
      return data as unknown as NewsArticle;
    },
    enabled: Boolean(id),
    staleTime: 60000,
    retry: false,
  });
