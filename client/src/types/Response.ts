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
