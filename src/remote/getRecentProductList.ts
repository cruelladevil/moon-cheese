import { http } from '@/utils/http';
import { API_PATH } from './constants/path';
import { useSuspenseQuery } from '@tanstack/react-query';

interface GetRecentProductsResponse {
  recentProducts: Array<{
    id: number;
    thumbnail: string;
    name: string;
    price: number;
  }>;
}

export function getRecentProducts() {
  return http.get<GetRecentProductsResponse>(API_PATH.RECENT_PRODUCT_LIST);
}

export function useRecentProducts() {
  return useSuspenseQuery({
    queryKey: [API_PATH.RECENT_PRODUCT_LIST],
    queryFn: getRecentProducts,
  });
}
