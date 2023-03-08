import localStorageHandler from "@/components/utils/local-storage-handler";
import {
  CREATE_ALBUM_URL,
  REQUEST_HEADERS_POST,
  REQUEST_HEADERS_POST_PHOTOS,
  SEND_PHOTO_URL,
} from "@const";
import axios from "axios";
import { IAlbumsResponse, IInfoResponse } from "./axios-response-types.types";
import axiosInstance from "./custom-axios-instance";

class AlbumsService {
  public async getPage<T>({
    pageEndpoint,
  }: {
    pageEndpoint: string;
  }): Promise<IInfoResponse | IAlbumsResponse> {
    try {
      const response: IInfoResponse | IAlbumsResponse =
        await axiosInstance().get(pageEndpoint, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });
      return response;
    } catch (err: any) {
      console.error("An error occured in get page request: ", err);
      return err.code;
    }
  }

  public async postAlbum({
    albumObject,
  }: {
    albumObject: {
      albumname: string;
      albumlocation: string;
      date: string;
    };
  }): Promise<IInfoResponse> {
    try {
      const response: IInfoResponse = await axiosInstance().post(
        CREATE_ALBUM_URL,
        albumObject,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (err: any) {
      console.error("An error occured in post album request: ", err);
      return err.code;
    }
  }

  public async postPhotos(formData: FormData) {
    try {
      const accessToken = localStorageHandler.getAccessToken();
      const response = await axios({
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
}
const albumsService = new AlbumsService();

export default albumsService;
