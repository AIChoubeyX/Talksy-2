
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../lib/api";

export function useUserProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
}
