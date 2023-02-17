import axios from "axios";

import {
  BASIC_URL,
  REGISTRATION_URL,
  REQUEST_HEADERS,
  LOGIN_URL,
  REQUEST_HEADERS_GET,
  REQUEST_HEADERS_POST_PHOTOS,
  SEND_PHOTO_URL,
  THIRTY_MINUTES,
  REFRESH_URL,
} from "@const";

import {
  TAxiosResponse,
  TPageRequestArguments,
} from "./axios-requests-handler.types";

class AxiosRequestsHandler {
  constructor() {}

  public async registration(
    login: string,
    password: string,
    email?: string,
    fullname?: string
  ): Promise<TAxiosResponse> {
    try {
      const response: TAxiosResponse = await axios({
        method: "post",
        url: REGISTRATION_URL,
        data: {
          login,
          password,
          email,
          fullname,
        },
        withCredentials: false,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          ...REQUEST_HEADERS,
        },
      });
      return response;
    } catch (err: any) {
      console.error("An error occured in makeRegistrationRequest: ", err);
      return err.code;
    }
  }

  public async login(login: string, password: string): Promise<TAxiosResponse> {
    try {
      const response: TAxiosResponse = await axios({
        method: "post",
        url: LOGIN_URL,
        data: {
          login,
          password,
        },
        withCredentials: false,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          ...REQUEST_HEADERS,
        },
      });
      return response;
    } catch (err: any) {
      console.error("An error occured in makeRegistrationRequest: ", err);
      return err.code;
    }
  }

  public async getPage(
    accessToken: string,
    pageEndpoint: string
  ): Promise<TAxiosResponse> {
    try {
      const response: TAxiosResponse = await axios({
        method: "get",
        url: pageEndpoint,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...REQUEST_HEADERS_GET,
        },
      });
      return response;
    } catch (err: any) {
      console.error("An error occured in makePageRequest: ", err);
      return err.code;
    }
  }

  public async postAlbum(
    accessToken: any,
    pageEndpoint: string,
    albumObject: {
      albumname: string;
      albumlocation: string;
      date: Date;
    }
  ): Promise<TAxiosResponse> {
    try {
      const response: TAxiosResponse = await axios({
        method: "post",
        url: pageEndpoint,
        data: albumObject,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...REQUEST_HEADERS,
        },
      });
      return response;
    } catch (err: any) {
      console.error("An error occured in postNewAlbum: ", err);
      return err.code;
    }
  }

  public async postPhotos(
    accessToken: any,
    formData: FormData
  ): Promise<TAxiosResponse> {
    try {
      const response: TAxiosResponse = await axios({
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

  public async makeRefreshRequest(
    refreshToken: string
  ): Promise<TAxiosResponse> {
    try {
      const response: TAxiosResponse = await axios({
        method: "post",
        baseURL: REFRESH_URL,
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          ...REQUEST_HEADERS,
        },
      });
      return response;
    } catch (err: any) {
      console.error("An error occured in makeRefreshRequest: ", err);
      return err.code;
    }
  }

  public async makePageRequestWithInterceptor({
    accessToken,
    refreshToken,
    expiresIn,
    enrollAction,
    pageEndpoint,
  }: TPageRequestArguments) {
    try {
      const instance = axios.create({
        baseURL: BASIC_URL,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...REQUEST_HEADERS,
        },
      });
      instance.interceptors.request.use(
        async (req) => {
          const currentTime = new Date().getTime();
          if (expiresIn - currentTime <= THIRTY_MINUTES) {
            try {
              console.log("send refresh request");
              const response: TAxiosResponse = await this.makeRefreshRequest(
                refreshToken
              );
              console.log("response: ", response);
              const { token, refreshtoken } = response.data;
              console.log("new tokens: ", token, refreshtoken);
              enrollAction([token, refreshtoken]);
              return req;
            } catch (err: any) {
              console.error(
                "An error occured in makePageRequestWithInterceptor",
                err
              );
              throw new Error("Error during token exchange");
            }
          }
          return req;
        },
        (err) => {
          console.error(
            "An error occured in makePageRequestWithInterceptor",
            err
          );
          throw new Error("Error during token exchange");
        }
      );
      return await instance.get(pageEndpoint);
    } catch (err: unknown) {
      console.error(
        "An error occured in makePageRequestWithInterceptor: ",
        err
      );
      return err as Error;
    }
  }
}
const axiosRequestHandler = new AxiosRequestsHandler();

export default axiosRequestHandler;

/*
export const makeRegistrationRequest = async (
  login: string,
  password: string,
  email?: string,
  fullname?: string
): Promise<any> => {
  try {
    const response: TAxiosResponse = await axios({
      method: "post",
      url: REGISTRATION_URL,
      data: {
        login,
        password,
        email,
        fullname,
      },
      withCredentials: false,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        ...REQUEST_HEADERS,
      },
    });
    return response;
  } catch (err: any) {
    console.error("An error occured in makeRegistrationRequest: ", err);
    return err.code;
  }
};


export const makeLoginRequest = async (
  login: string,
  password: string
): Promise<any> => {
  try {
    const response: TAxiosResponse = await axios({
      method: "post",
      url: LOGIN_URL,
      data: {
        login,
        password,
      },
      withCredentials: false,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        ...REQUEST_HEADERS,
      },
    });
    return response;
  } catch (err: any) {
    console.error("An error occured in makeRegistrationRequest: ", err);
    return err.code;
  }
};

export const makePageRequest = async (
  accessToken: string,
  pageEndpoint: string
): Promise<any> => {
  try {
    const response: TAxiosResponse = await axios({
      method: "get",
      url: pageEndpoint,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...REQUEST_HEADERS_GET,
      },
    });
    return response;
  } catch (err: any) {
    console.error("An error occured in makePageRequest: ", err);
    return err.code;
  }
};

export const postNewAlbum = async (
  accessToken: any,
  pageEndpoint: string,
  albumObject: {
    albumname: string;
    albumlocation: string;
    date: Date;
  }
): Promise<any> => {
  try {
    const response: TAxiosResponse = await axios({
      method: "post",
      url: pageEndpoint,
      data: albumObject,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...REQUEST_HEADERS,
      },
    });
    return response;
  } catch (err: any) {
    console.error("An error occured in postNewAlbum: ", err);
    return err.code;
  }
};

export const postPhotos = async (
  accessToken: any,
  formData: FormData
): Promise<any> => {
  try {
    const response: TAxiosResponse = await axios({
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
};

export const makeRefreshRequest = async (refreshToken: string) => {
  try {
    const response: TAxiosResponse = await axios({
      method: "post",
      baseURL: REFRESH_URL,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        ...REQUEST_HEADERS,
      },
    });
    return response;
  } catch (err: any) {
    console.error("An error occured in makeRefreshRequest: ", err);
    return err.code;
  }
};

export const makePageRequestWithInterceptor = async ({
  accessToken,
  refreshToken,
  expiresIn,
  enrollAction,
  pageEndpoint,
}: TPageRequestArguments) => {
  try {
    const instance = axios.create({
      baseURL: BASIC_URL,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...REQUEST_HEADERS,
      },
    });
    instance.interceptors.request.use(
      async (req) => {
        const currentTime = new Date().getTime();
        if (expiresIn - currentTime <= THIRTY_MINUTES) {
          try {
            console.log("send refresh request");
            const response: TAxiosResponse = await makeRefreshRequest(
              refreshToken
            );
            console.log("response: ", response);
            const { token, refreshtoken } = response.data;
            console.log("new tokens: ", token, refreshtoken);
            enrollAction([token, refreshtoken]);
            return req;
          } catch (err: any) {
            console.error(
              "An error occured in makePageRequestWithInterceptor",
              err
            );
            throw new Error("Error during token exchange");
          }
        }
        return req;
      },
      (err) => {
        console.error(
          "An error occured in makePageRequestWithInterceptor",
          err
        );
        throw new Error("Error during token exchange");
      }
    );
    return await instance.get(pageEndpoint);
  } catch (err: unknown) {
    console.error("An error occured in makePageRequestWithInterceptor: ", err);
    return err as Error;
  }
};
*/
