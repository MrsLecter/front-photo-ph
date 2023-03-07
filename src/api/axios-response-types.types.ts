import { AxiosHeaders } from "axios";

export interface ILoginResponse {
  message: string;
  refreshtoken: string;
  status: number;
  token: string;
}

export interface IInfoResponse {
  message: string;
  status: number;
}

export interface IAlbumObject {
  albumdate: string;
  albumlocation: string;
  albumname: string;
  id: number;
  photo: string;
}

export interface IAlbumsResponse {
  message: IAlbumObject[];
  status: number;
}

export interface IPhotoObject {
  albumdate: string;
  albumlocation: string;
  albumname: string;
  id: number;
  idphoto: number;
  photo: string;
  clients: string;
}

export interface IAlbumsPhotoResponse {
  message: IPhotoObject[];
  status: number;
}

export interface IPhotoPostResponse {
  config: Object;
  data: {
    message: string;
    status: 201;
  };
  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}
