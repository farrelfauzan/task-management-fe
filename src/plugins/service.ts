import { Api } from "../swagger/api";
import { AxiosError } from "axios";

export const api = new Api({
  baseURL: import.meta.env.REACT_APP_API_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

api.instance.interceptors.request.use(
  (config: any) => {
    console.log("Service Requesting ...", config.url);

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.instance.interceptors.response.use(
  (response) => {
    console.log("Service Response ...", response);
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized");
    }

    return Promise.reject(error);
  }
);
