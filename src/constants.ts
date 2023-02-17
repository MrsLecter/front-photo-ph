export const EMAIL_REGEXP = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,20}$/;
export const PASSWORD_REGEXP = /.{8,}/;
export const LOGIN_REGEXP = /^[a-zA-Z_]{3,19}[a-zA-Z_]$/;
export const FULLNAME_REGEXP =
  /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{2,16})/;

export const TWENTY_FOUR_HOURS_IN_MS = 86400000;
export const THIRTY_MINUTES = 1800000;

export const REQUEST_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With",
  "Content-Security-Policy": "default-src self",
};

export const REQUEST_HEADERS_GET = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With",
  "Content-Security-Policy": "default-src self",
};

export const REQUEST_HEADERS_POST_PHOTOS = {
  "Access-Control-Allow-Methods": "POST",
  "Content-type": "multipart/form-data",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With",
  "Content-Security-Policy": "default-src self",
};

export const BASIC_URL = `https://0524-5-255-191-74.eu.ngrok.io`;
export const REGISTRATION_URL = `${BASIC_URL}/ph-register`;
export const LOGIN_URL = `${BASIC_URL}/ph-login`;
export const REFRESH_URL = `${BASIC_URL}/refresh-ph-tokens`;
export const ALBUMS_URL = `${BASIC_URL}/all-albums`;
export const ALBUM_URL = `${BASIC_URL}/albums/`;
export const CREATE_ALBUM_URL = `${BASIC_URL}/create-an-album`;
export const SEND_PHOTO_URL = `${BASIC_URL}/upload-photos-to-s3`;
export const SEND_PHOTO_URL2 = `${BASIC_URL}/upload-photos`;

export enum AppUrlsEnum {
  HOME = "/",
  LOGIN = "./login",
  REG = "./registration",
  ALBUM_CREATE = "./albums/create",
  ALBUM_LIST = "./albums",
  ALBUM_PAGE = "./albums/:albumName",
  POLICY = "./policy",
  TERMS = "./terms",
  INFO = "./info/:message",
  OTHER = "*",
}

export const MAIN_MENU_BUTTONS = [
  {
    id: 1,
    label: "New album",
    way: AppUrlsEnum.ALBUM_CREATE,
  },
  {
    id: 2,
    label: "All albums",
    way: AppUrlsEnum.ALBUM_LIST,
  },
  {
    id: 4,
    label: "Policy",
    way: AppUrlsEnum.POLICY,
  },
  {
    id: 5,
    label: "Terms",
    way: AppUrlsEnum.TERMS,
  },
];
