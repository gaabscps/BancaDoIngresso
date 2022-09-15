import { AxiosError, AxiosResponse } from 'axios';

export default interface CustomError {
  status: number;
  message: string;
  details?: string[];
}

export const parse = (error: AxiosError): CustomError | undefined => {
  if (error.response) {
    const response = error.response as AxiosResponse;
    const customError: CustomError = {
      status: response.status,
      message: response.data?.message,
    };
    return customError;
  }
  return undefined;
};
