import { useSearchParams } from "react-router-dom";

export function useActiveLessonParams() {
  const [searchParams] = useSearchParams();
  const activeLessonId = searchParams.get("lesson");

  return Number(activeLessonId);
}
