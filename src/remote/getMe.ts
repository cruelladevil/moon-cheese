import { http } from '@/utils/http';
import { API_PATH } from './constants/path';
import { useSuspenseQuery } from '@tanstack/react-query';

interface MeResponse {
  point: number;
  grade: 'EXPLORER' | 'PILOT' | 'COMMANDER';
}

export function getMe() {
  return http.get<MeResponse>(API_PATH.ME);
}

export function useMe() {
  return useSuspenseQuery({
    queryKey: [API_PATH.ME],
    queryFn: getMe,
  });
}
