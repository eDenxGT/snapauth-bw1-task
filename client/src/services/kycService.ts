import { privateAxiosInstance } from "@/api/privateAxios.instance";
import type { IAxiosResponse } from "@/types/Response";

export const uploadKyc = async (data: FormData) => {
  const response = await privateAxiosInstance.post<IAxiosResponse>(
    "/upload-kyc",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
