import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isPending: isFetchingSettings,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });
  return { settings, isFetchingSettings, error };
}
