import { fetchUsers } from "@/services/userService";
import type { IPaginatedUserResponse } from "@/types/Response";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = ({
  search,
  currentPage,
  itemsPerPage,
}: {
  search?: string;
  currentPage: number;
  itemsPerPage: number;
}) => {
  return useQuery<IPaginatedUserResponse>({
    queryKey: ["users", search, currentPage, itemsPerPage],
    queryFn: () => fetchUsers({ page: currentPage, itemsPerPage, search }),
  });
};
