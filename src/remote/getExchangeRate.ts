import { http } from '@/utils/http';
import { API_PATH } from './constants/path';
import { useQuery } from '@tanstack/react-query';

interface GetExchangeRate {
  exchangeRate: {
    KRW: number;
    USD: number;
  };
}

export function getExchangeRate() {
  return http.get<GetExchangeRate>(API_PATH.EXCHANGE_RATE);
}

/**
 * 달러 베이스, 환율은 1달러 기준.
 */
export function useExchangeRate() {
  return useQuery({
    queryKey: [API_PATH.EXCHANGE_RATE],
    queryFn: getExchangeRate,
    staleTime: 0,
    gcTime: 0,
  });
}
