import albumsService from "@/api/albums-service";
import { IAlbumObject } from "@/api/axios-response-types.types";
import { EmptyDataStub } from "@/components/emptyDataStub/EmptyDataStub";
import localStorageHandler from "@/components/utils/local-storage-handler";
import ButtonAdd from "@common/buttons/ButtonAdd";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import Logo from "@common/logo/Logo";
import { ALBUMS_URL, AppUrlsEnum } from "@const";
import WrapperContent from "@wrappers/wrapperContent/WrapperContent";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import WrapperPage from "../../wrappers/wrapperPage/WrapperPage";
import { AlbumFolder } from "./albumFolder/AlbumFolder";
import AlbumListWrapper from "./albumListWrapper/AlbumListWrapper";

export const AlbumList: React.FC = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [albumData, setAlbumData] = useState<IAlbumObject[]>([]);

  useEffect(() => {
    const getAlbumData = async () => {
      try {
        setIsLoading(true);
        const albumsResponse = await albumsService.getPage({
          pageEndpoint: ALBUMS_URL,
        });
        const { message, status } = albumsResponse;
        if (status === 200 && typeof message !== "string") {
          setAlbumData(message);
        } else {
          localStorageHandler.deletePhotographersData();
          navigate("../" + AppUrlsEnum.INFO + `/${message}`);
        }
      } catch (err: unknown) {
        console.error("Error in getAlbumData: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (!localStorageHandler.isPhotographerExist()) {
      navigate("../" + AppUrlsEnum.LOGIN);
    }
    if (localStorageHandler.isPhotographerExist()) {
      getAlbumData();
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
