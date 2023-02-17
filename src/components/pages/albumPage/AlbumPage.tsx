import { userSlice } from "@/components/store/reducers/userSlice";
import { useAppSelector } from "@hooks/reducers-hooks";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { ALBUM_URL } from "@const";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import WrapperModal from "@wrappers/wrapperModal/WrapperModal";
import { PickedImage } from "./pickedImage/PickedImage";
import UploadImage from "./uploadImage/UploadImage";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import Logo from "@common/logo/Logo";
import ButtonBack from "@common/buttons/ButtonBack";
import { AlbumPanel } from "./albumPanel/AlbumPanel";
import {
  WrapperImages,
  WrapperImagesItem,
} from "@wrappers/wrapperImages/WrapperImages";
import { EmptyDataStub } from "@/components/emptyDataStub/EmptyDataStub";
import requestHandler from "@/api/fetch-request-handler";
import {
  IAlbumsPhotoResponse,
  IPhotoObject,
  IInfoResponse,
} from "@/api/fetch-requests-handler.types";
import { ButtonUploadBlue } from "@common/buttons/ButtonUploadBlue";
import ButtonSubmit from "@common/buttons/ButtonSubmit";
import { ButtonUpload } from "@common/buttons/ButtonUpload";

export const AlbumPage: React.FC = () => {
  const navigation = useNavigation();
  const { accessToken, refreshToken, expiresIn } = useAppSelector(
    (store) => store.userReducer
  );
  const { enroll } = userSlice.actions;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [column, toggleColumn] = useState<boolean>(false);
  const [isImageActive, setImageIsActive] = useState<boolean>(false);
  const [isUploadActive, setIsUploadActive] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<{
    src: string;
    owners: string;
  }>({
    src: "",
    owners: "",
  });
  const [albumData, setAlbumData] = useState<IPhotoObject[]>(); //TODO: type
  let { albumName } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getAlbumInfo = async () => {
      try {
        const response: IAlbumsPhotoResponse | IInfoResponse =
          await requestHandler.getPage<IAlbumsPhotoResponse>({
            accessToken,
            pageEndpoint: ALBUM_URL + albumName,
          });
        console.log("response", response);
        const { message, status } = response;
        if (status === 200 && typeof message !== "string" && message) {
          setAlbumData(message);
        } else {
          navigate(`/info/${message}`);
        }
      } catch (err: unknown) {
        console.error("Error in getTokenInformaion: ", err);
      }
    };

    getAlbumInfo();
  }, []);

  const pickImageHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const img = event.target;
    console.log((img as HTMLImageElement).src);
    const imageOwners = (img as HTMLImageElement).getAttribute(
      "data-image-owners"
    );
    const imageID = (img as HTMLImageElement).getAttribute("data-image-id");
    setCurrentImage({
      src: (img as HTMLImageElement).src,
      owners: imageOwners || "",
    });
    setImageIsActive(true);
  };
  const uploadImageHandler = () => {
    setIsUploadActive(true);
    console.log("image upload");
  };

  const handleColumnToggle = () => {
    toggleColumn(!column);
  };
  return (
    <>
      {navigation.state === "loading" ? <LoadingBlock /> : <></>}
      {isLoading ? <LoadingBlock /> : <></>}
      {isImageActive && (
        <WrapperModal backClickHandler={() => setImageIsActive(!isImageActive)}>
          <PickedImage
            imageSrc={currentImage.src}
            imageOwners={currentImage.owners}
          />
        </WrapperModal>
      )}
      {isUploadActive && (
        <WrapperModal
          backClickHandler={() => setIsUploadActive(!isUploadActive)}
        >
          <UploadImage albumName={albumName!} />
        </WrapperModal>
      )}
      <WrapperPage>
        <Logo />
        <ButtonBack />
        {/* INFO: deleted 15.02.23 : we don’t show album’s photos to the
        photographer, user can see only upload button */}

        {/* <AlbumPanel
          photosAmount={albumData?.length || 1}
          buttonUpload={() => uploadImageHandler()}
          checked={column}
          swithChangeHandler={handleColumnToggle}
        />
        {albumData && albumData[0] ? (
          <></>
        ) : (
          <EmptyDataStub label="Photo not found" />
        )} */}
        {/* <WrapperImages isOneColumn={column} pickImageHandler={pickImageHandler}>
          {albumData && albumData[0] ? (
            albumData.map((item) => {
              return (
                <WrapperImagesItem isOneColumn={column} key={item.idphoto}>
                  <img
                    key={item.idphoto}
                    src={String(item.photo)}
                    data-image-id={item.id}
                    data-image-owners={item.clients}
                    alt="clientsPhoto"
                  />
                </WrapperImagesItem>
              );
            })
          ) : (
            <></>
          )}
        </WrapperImages> */}
        <ButtonUploadBlue buttonHandler={() => uploadImageHandler()} />
      </WrapperPage>
    </>
  );
};
