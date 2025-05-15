import type { User } from "./User";

export interface IAxiosResponse {
  success: boolean;
  message: string;
}

export interface ILoginResponse extends IAxiosResponse {
  user: {
    id: string;
    email: string;
  };
}

export interface IPaginatedUserResponse {
  users: User[];
  totalUsers: number;
  totalPages: number;
}
