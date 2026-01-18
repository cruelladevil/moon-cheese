import { http } from '@/utils/http';
import { API_PATH } from './constants/path';
import { useSuspenseQuery } from '@tanstack/react-query';

interface GradePointListResponse {
  gradePointList: Array<{
    type: 'EXPLORER' | 'PILOT' | 'COMMANDER';
    minPoint: number;
  }>;
}

export function getGradePointList() {
  return http.get<GradePointListResponse>(API_PATH.GRADE_POINT_LIST);
}

export function useGradePointList() {
  return useSuspenseQuery({
    queryKey: [API_PATH.GRADE_POINT_LIST],
    queryFn: getGradePointList,
    staleTime: 5 * 60 * 1000,
  });
}
