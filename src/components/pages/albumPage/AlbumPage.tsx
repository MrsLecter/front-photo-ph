import { useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import WrapperModal from "@wrappers/wrapperModal/WrapperModal";
import UploadImage from "./uploadImage/UploadImage";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import Logo from "@common/logo/Logo";
import ButtonBack from "@common/buttons/ButtonBack";
import { ButtonUploadBlue } from "@common/buttons/ButtonUploadBlue";
import WrapperContent from "@wrappers/wrapperContent/WrapperContent";
import WrapperCenter from "@wrappers/wrapperCenter/wrapperCenter";

export const AlbumPage: React.FC = () => {
  let { albumName } = useParams();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploadActive, setIsUploadActive] = useState<boolean>(false);

  const uploadImageHandler = () => {
    setIsUploadActive(true);
  };

  return (
    <>
      {navigation.state === "loading" ? <LoadingBlock /> : <></>}
      {isLoading ? <LoadingBlock /> : <></>}
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
