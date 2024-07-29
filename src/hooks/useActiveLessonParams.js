import { useSearchParams } from "react-router-dom";

export function useActiveLessonParams() {
  const [searchParams] = useSearchParams();
  console.log("SEARCH PARAMS: ", searchParams.get("lesson"));
  const activeLessonId = searchParams.get("lesson");

  return activeLessonId;
}
