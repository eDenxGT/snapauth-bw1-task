import { privateAxiosInstance } from "@/api/privateAxios.instance";
import type { IPaginatedUserResponse } from "@/types/Response";

export const fetchUsers = async ({
  page,
  itemsPerPage,
  search,
}: {
  page: number;
  itemsPerPage: number;
  search?: string;
}): Promise<IPaginatedUserResponse> => {
  const response = await privateAxiosInstance.get(
    `/users?page=${page}&limit=${itemsPerPage}&search=${search}`
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Something went wrong");
  }

  return response.data;
};
