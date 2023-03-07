import { CREATE_ALBUM_URL, REQUEST_HEADERS_POST, SEND_PHOTO_URL } from "@const";
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

  public async postPhotos(formData: FormData): Promise<IInfoResponse> {
    try {
      const response: IInfoResponse = await axiosInstance().post(
        SEND_PHOTO_URL,
        formData,
        {
          headers: {
            ...REQUEST_HEADERS_POST,
          },
        }
      );
      return response;
    } catch (err: any) {
      console.error("An error occured in post photos request: ", err);
      return err.code;
    }
  }
}
const albumsService = new AlbumsService();

export default albumsService;
