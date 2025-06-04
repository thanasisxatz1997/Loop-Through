import { useQuery } from "@tanstack/react-query";
import { isAdminRequest } from "../../services/apiSettings";

export function useIsAdmin() {
  const { data: isAdmin, isPending: isPendingisAdmin } = useQuery({
    queryFn: () => isAdminRequest(),
    queryKey: ["isAdmin"],
  });
  return { isAdmin, isPendingisAdmin };
}
