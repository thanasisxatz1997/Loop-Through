import { useQuery } from "@tanstack/react-query";
import { getAllImageUrls } from "../../services/apiImages";

export function usePublicImages() {
  const { data: publicImages, isPending: isLoadingPublicImages } = useQuery({
    queryKey: ["publicImages"],
    queryFn: getAllImageUrls,
  });
  return { publicImages, isLoadingPublicImages };
}
