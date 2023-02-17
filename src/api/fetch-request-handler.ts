import {
  BASIC_URL,
  REGISTRATION_URL,
  REQUEST_HEADERS,
  LOGIN_URL,
  CREATE_ALBUM_URL,
  REQUEST_HEADERS_GET,
  REQUEST_HEADERS_POST_PHOTOS,
  SEND_PHOTO_URL,
  THIRTY_MINUTES,
  REFRESH_URL,
} from "@const";
import axios from "axios";
import {
  ILoginResponse,
  IInfoResponse,
  IAlbumsResponse,
} from "./fetch-requests-handler.types";

class FetchRequestsHandler {
  constructor() {}

  public async registration(
    login: string,
    password: string,
    email?: string,
    fullname?: string
  ): Promise<IInfoResponse> {
    try {
      const response: Response = await fetch(REGISTRATION_URL, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login,
          password,
          email,
          fullname,
        }),
      });
      return response.json();
    } catch (err: any) {
      console.error("An error occured in makeRegistrationRequest: ", err);
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
      const response: Response = await fetch(LOGIN_URL, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login,
          password,
        }),
      });
      return response.json();
    } catch (err: any) {
      console.error("An error occured in makeRegistrationRequest: ", err);
      return err.code;
    }
  }

  public async getPage<T>({
    accessToken,
    pageEndpoint,
  }: {
    accessToken: string;
    pageEndpoint: string;
  }): Promise<T | IInfoResponse> {
    try {
      const response: Response = await fetch(pageEndpoint, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.json();
    } catch (err: any) {
      console.error("An error occured in makePageRequest: ", err);
      return err.code;
    }
  }

  public async postAlbum({
    accessToken,
    albumObject,
  }: {
    accessToken: string;
    albumObject: {
      albumname: string;
      albumlocation: string;
      date: Date;
    };
  }): Promise<IInfoResponse> {
    try {
      const response: Response = await fetch(
        CREATE_ALBUM_URL,

        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(albumObject),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("fetch post album:", response);
      return response.json();
    } catch (err: any) {
      console.error("An error occured in postNewAlbum: ", err);
      return err.code;
    }
  }

  public async postPhotos(
    accessToken: string,
    formData: FormData
  ): Promise<IInfoResponse> {
    // try {
    //   const response: Response = await fetch(SEND_PHOTO_URL, {
    //     method: "POST",
    //     mode: "cors",
    //     body: formData,
    //     headers: {
    //       "Access-Control-Allow-Methods": "POST",
    //       "Content-type": "multipart/form-data",
    //       "Access-Control-Allow-Headers":
    //         "Content-Type, Authorization, X-Requested-With",
    //       "Content-Security-Policy": "default-src self",
    //       // "Access-Control-Allow-Headers": "Content-Type, Authorization",
    //       // "Access-Control-Allow-Methods": "POST",
    //       // "Content-type": "multipart/form-data",
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   });
    //   return response.json();
    // } catch (err: any) {
    //   console.error("An error occured in postPhotos: ", err);
    //   return err.code;
    // }
    try {
      const response: IInfoResponse = await axios({
        method: "post",
        url: SEND_PHOTO_URL,
        data: formData,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...REQUEST_HEADERS_POST_PHOTOS,
        },
      });
      return response;
    } catch (err: any) {
      console.error("An error occured in postPhotos: ", err);
      return err.code;
    }
  }

  public async makeRefreshRequest({ refreshToken }: { refreshToken: string }) {
    try {
      const response: Response = await fetch(REFRESH_URL, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      return response.json();
    } catch (err: any) {
      console.error("An error occured in postNewAlbum: ", err);
      return err.code;
    }
  }
}
const requestHandler = new FetchRequestsHandler();

export default requestHandler;
