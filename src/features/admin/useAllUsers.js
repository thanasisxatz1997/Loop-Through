import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiUsers";

export function useAllUsers() {
  const {
    isPending: isFetchingUsers,
    data: users,
    error,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => getAllUsers(),
  });
  return { users, isFetchingUsers, error };
}
