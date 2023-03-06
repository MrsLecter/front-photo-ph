import { userSlice } from "@/components/store/reducers/userSlice";
import { useAppSelector } from "@hooks/reducers-hooks";
import { useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import WrapperModal from "@wrappers/wrapperModal/WrapperModal";
import { PickedImage } from "./pickedImage/PickedImage";
import UploadImage from "./uploadImage/UploadImage";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import Logo from "@common/logo/Logo";
import ButtonBack from "@common/buttons/ButtonBack";
import { IPhotoObject } from "@/api/fetch-requests-handler.types";
import { ButtonUploadBlue } from "@common/buttons/ButtonUploadBlue";
import WrapperContent from "@wrappers/wrapperContent/WrapperContent";
import WrapperCenter from "@wrappers/wrapperCenter/wrapperCenter";

export const AlbumPage: React.FC = () => {
  let { albumName } = useParams();
  const navigate = useNavigate();
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

  const pickImageHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const img = event.target;
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
        <WrapperCenter>
          <WrapperContent>
            <ButtonUploadBlue buttonHandler={() => uploadImageHandler()} />
          </WrapperContent>
        </WrapperCenter>
      </WrapperPage>
    </>
  );
};
