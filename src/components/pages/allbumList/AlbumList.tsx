import requestHandler from "@/api/fetch-request-handler";
import {
  IAlbumObject,
  IAlbumsResponse,
  IInfoResponse,
} from "@/api/fetch-requests-handler.types";
import { EmptyDataStub } from "@/components/emptyDataStub/EmptyDataStub";
import { userSlice } from "@/components/store/reducers/userSlice";
import { checkTokenRelevance } from "@/components/utils/helpers";
import ButtonAdd from "@common/buttons/ButtonAdd";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import Logo from "@common/logo/Logo";
import { ALBUMS_URL } from "@const";
import { useAppDispatch, useAppSelector } from "@hooks/reducers-hooks";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import WrapperPage from "../../wrappers/wrapperPage/WrapperPage";
import { AlbumFolder } from "./albumFolder/AlbumFolder";
import AlbumListWrapper from "./albumListWrapper/AlbumListWrapper";

export const AlbumList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enroll } = userSlice.actions;
  const { accessToken, refreshToken, expiresIn } = useAppSelector(
    (state) => state.userReducer
  );
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [albumData, setAlbumData] = useState<IAlbumObject[]>([]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        await checkTokenRelevance({
          refreshToken,
          expiresIn,
        });
      } catch (err: unknown) {
        console.error("Error", err);
      }
    };
    checkToken();
    const getAlbumData = async () => {
      try {
        setIsLoading(true);
        const response: IAlbumsResponse | IInfoResponse =
          await requestHandler.getPage({
            accessToken,
            pageEndpoint: ALBUMS_URL,
          });
        const { message, status } = response;

        if (status === 200 && typeof message !== "string") {
          setAlbumData(message);
        } else {
          navigate(`/info/${message}`);
        }
      } catch (err: unknown) {
        console.error("Error in getAlbumData: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    console.log("refresh", refreshToken);

    getAlbumData();
  }, []);

  return (
    <WrapperPage>
      {navigation.state === "loading" ? <LoadingBlock /> : <></>}
      {isLoading ? <LoadingBlock /> : <></>}
      <Logo />
      <ButtonAdd />
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
    </WrapperPage>
  );
};
