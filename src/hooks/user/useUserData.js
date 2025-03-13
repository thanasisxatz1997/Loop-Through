import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/apiUsers";

export function useUserData(userId) {
  const { data: userData, isLoadingUserData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserById(userId),
  });
  return { userData, isLoadingUserData };
}
