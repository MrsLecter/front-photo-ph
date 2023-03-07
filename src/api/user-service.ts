import {
  LOGIN_URL,
  REFRESH_URL,
  REGISTRATION_URL,
  REQUEST_HEADERS_POST,
} from "@const";
import axios, { AxiosResponse } from "axios";
import axiosInstance from "./custom-axios-instance";
import { IInfoResponse, ILoginResponse } from "./axios-response-types.types";
import localStorageHandler from "@/components/utils/local-storage-handler";

class UserService {
  public async registration(
    login: string,
    password: string,
    email?: string,
    fullname?: string
  ): Promise<IInfoResponse> {
    try {
      const response: IInfoResponse = await axiosInstance().post(
        REGISTRATION_URL,
        {
          login,
          password,
          email,
          fullname,
        },
        {
          headers: { ...REQUEST_HEADERS_POST },
        }
      );
      return response;
    } catch (err: any) {
      console.error("An error occured in registration request: ", err);
      return err.code;
    }
  }

  public async login({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<ILoginResponse> {
    try {
      const response: ILoginResponse = await axiosInstance().post(
        LOGIN_URL,
        {
          login,
          password,
        },
        {
          headers: { ...REQUEST_HEADERS_POST },
        }
      );
      return response;
    } catch (err: any) {
      console.error("An error occured in login request: ", err);
      return err.code;
    }
  }

  public async makeRefreshRequest() {
    try {
      const response: AxiosResponse<ILoginResponse, any> = await axios({
        method: "post",
        url: REFRESH_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageHandler.getRefreshToken()}`,
        },
      });
      return response;
    } catch (err: any) {
      console.error("An error occured in post photos request: ", err);
      return err.code;
    }
  }
}

const userService = new UserService();
export default userService;
