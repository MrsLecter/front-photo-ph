import localStorageHandler from "@/components/utils/local-storage-handler";
import axios, { AxiosResponse } from "axios";
import userService from "./user-service";

const axiosInstance = () => {
  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use((config) => {
    config.headers["Authorization"] = localStorageHandler.getAccessToken();
    return config;
  });

  const onSuccess = (response: AxiosResponse) => response.data;

  const onError = async (error: any) => {
    if (error.response.status === 401 || error.response.status === 404) {
      localStorageHandler.deletePhotographersData();
      window.location.replace("../");
    }
    if (error.response.status === 403) {
      const newTokens = await userService.makeRefreshRequest();
      if (newTokens.status === 200) {
        localStorageHandler.setPhotographerData({
          accessToken: newTokens.data.accessToken,
          refreshToken: newTokens.data.refreshToken,
        });
        return axiosInstance(error.config);
      } else {
        localStorageHandler.deletePhotographersData();
        window.location.replace("../");
      }
    }
  };
  axiosInstance.interceptors.response.use(onSuccess, onError);
  return axiosInstance;
};

export default axiosInstance;
