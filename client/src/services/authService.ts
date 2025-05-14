import { authAxiosInstance } from "@/api/auth-axios.Instance";
import type { IAxiosResponse, ILoginResponse } from "@/types/Response";

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await authAxiosInstance.post<ILoginResponse>("/login", {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await authAxiosInstance.post<IAxiosResponse>("/register", {
    email,
    password,
  });

  return response.data;
};
