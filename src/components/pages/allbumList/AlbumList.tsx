import requestHandler from "@/api/fetch-request-handler";
import {
  IAlbumObject,
  IAlbumsResponse,
  IInfoResponse,
} from "@/api/fetch-requests-handler.types";
import { EmptyDataStub } from "@/components/emptyDataStub/EmptyDataStub";
import { userSlice } from "@/components/store/reducers/userSlice";
import localStorageHandler from "@/components/utils/localStoragehandler";
import ButtonAdd from "@common/buttons/ButtonAdd";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import Logo from "@common/logo/Logo";
import { ALBUMS_URL, AppUrlsEnum } from "@const";
import { useAppDispatch, useAppSelector } from "@hooks/reducers-hooks";
import WrapperCenter from "@wrappers/wrapperCenter/wrapperCenter";
import WrapperContent from "@wrappers/wrapperContent/WrapperContent";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import WrapperPage from "../../wrappers/wrapperPage/WrapperPage";
import { AlbumFolder } from "./albumFolder/AlbumFolder";
import AlbumListWrapper from "./albumListWrapper/AlbumListWrapper";

export const AlbumList: React.FC = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { enroll, logout } = userSlice.actions;
  const { accessToken, refreshToken, expiresIn } = useAppSelector(
    (state) => state.userReducer
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [albumData, setAlbumData] = useState<IAlbumObject[]>([]);

  useEffect(() => {
    const getAlbumData = async (accessToken: string) => {
      try {
        setIsLoading(true);
        const albumsResponse: IAlbumsResponse | IInfoResponse =
          await requestHandler.getPage({
            accessToken,
            pageEndpoint: ALBUMS_URL,
          });
        const { message, status } = albumsResponse;

        if (status === 200 && typeof message !== "string") {
          setAlbumData(message);
        } else if (status === 404 || status === 401) {
          const newTokensResponse: IInfoResponse =
            await requestHandler.makeRefreshRequest({
              refreshToken,
            });
          if (newTokensResponse.status === 404) {
            navigate("../" + AppUrlsEnum.LOGIN);
          }
        } else {
          dispatch(logout());
          localStorageHandler.deletePhotographersData();
          navigate("../" + AppUrlsEnum.INFO + `/${message}`);
        }
      } catch (err: unknown) {
        console.error("Error in getAlbumData: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (!localStorageHandler.isPhotographerExist() && !accessToken) {
      navigate("../" + AppUrlsEnum.LOGIN);
    }
    if (localStorageHandler.isPhotographerExist() && !accessToken) {
      const newTokens = localStorageHandler.getPhotographersData();
      if (typeof newTokens !== "undefined") {
        dispatch(
          enroll({
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken,
          })
        );
        getAlbumData(newTokens.accessToken);
      } else {
        navigate("../" + AppUrlsEnum.LOGIN);
      }
    }
    if (accessToken && localStorageHandler.isPhotographerExist()) {
      getAlbumData(accessToken);
    }
  }, []);

  return (
    <WrapperPage>
      {navigation.state === "loading" ? <LoadingBlock /> : <></>}
      {isLoading ? <LoadingBlock /> : <></>}
      <Logo />
      <ButtonAdd />
      <WrapperContent>
        {albumData ? (
          <AlbumListWrapper>
            {albumData.map((album) => {
              return (
                <AlbumFolder
                  key={album.id}
                  id={album.id}
                  name={album.albumname}
                  location={album.albumlocation}
                  datapicker={String(album.albumdate)
                    .substring(0, 10)
                    .split("-")
                    .join("/")}
                  icon={album.photo}
                />
              );
            })}
          </AlbumListWrapper>
        ) : (
          <EmptyDataStub label="Albums not found" />
        )}
      </WrapperContent>
    </WrapperPage>
  );
};
