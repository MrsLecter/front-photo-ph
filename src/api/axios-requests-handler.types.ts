import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { AxiosHeaders } from "axios";

export type TAxiosAlbumResponse = {
  albumid: number;
  albumname: string;
  albumlocation: string;
  albumdate: Date;
  photo: string | null;
  photoid: string;
};

export type TAxiosResponse = {
  config: Object;
  data: {
    token: string;
    refreshtoken: string;
    message?: TAxiosAlbumResponse[] | string;
    body?: {
      access_token: string;
      refresh_token: string;
      status?: string;
    };
    status: string;
    status_code?: number;
    statusCode?: number;
  };
  statusCode?: number;
  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
};

export type TAxiosPageResponse = {
  config: Object;
  data: {
    message: TAxiosAlbumResponse[];
    status: string;
    status_code?: number;
    statusCode?: number;
  };
  statusCode?: number;
  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
};

export type TCredentials = {
  access_token: string;
  refresh_token: string;
};

export type TPageRequestArguments = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  enrollAction: ActionCreatorWithPayload<string[], "user/enroll">;
  pageEndpoint: string;
};
