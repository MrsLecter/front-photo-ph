import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UploadImageElement,
  UploadImageElementLogo,
  UploadImageElementBtnPanel,
  UploadImageElementChooseBlock,
  UploadImageElementList,
  UploadImageElementPicture,
  UploadImageElementOwners,
  UploadImageElementImg,
  UploadImageElementOwnersLabel,
  StyledSubmitBtn,
} from "./UploadImage.styles";
import approvedSVG from "@images/approved.svg";
import deleteSVG from "@images/delete.svg";
import selectSVG from "@images/select.svg";
import { AppUrlsEnum } from "@const";
import albumsService from "@/api/albums-service";

const UploadImage: React.FC<{ albumName: string }> = ({ albumName }) => {
  const [downloadList, setDownloadList] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | null>();
  const [ownersList, setOwnersList] = useState<string[]>([]);
  const [inputfiles, setFiles] = useState<File[]>();
  const navigate = useNavigate();

  const addImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imagesTarget = event.target.files;

    setFiles(Array.from(imagesTarget!));
    const imagesArray = Array.from(imagesTarget!).map((img) => {
      return URL.createObjectURL(img);
    });
    setDownloadList((prev) => [...prev, ...imagesArray]);
  };

  const deleteImageHandler = (item: string) => {
    setDownloadList(downloadList.filter((img) => img !== item));
  };

  const ownerChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    ownersList[index] = event.target.value;
  };

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("album", albumName);
    if (inputfiles) {
      let ownersData = "";
      for (let i = 0; i < inputfiles.length; i++) {
        formData.append("photos", inputfiles[i]);
        ownersData += ownersList[i] || "default";
        if (i !== inputfiles.length - 1) {
          ownersData += "*";
        }
      }
      formData.set("users", ownersData);
    }
    const postPhotosResponse = await albumsService.postPhotos(formData);
    if (postPhotosResponse.status === 201) {
      navigate("../");
    } else {
      navigate("../" + AppUrlsEnum.INFO + `/${"photo not sent! Try again!"}`);
    }
  };

  return (
    <UploadImageElement>
      <UploadImageElementLogo>Upload your images</UploadImageElementLogo>

      <form name="photos" onSubmit={submitFormHandler} method="post">
        <BtnFormSubmit />
        <UploadImageElementBtnPanel>
          <UploadImageElementChooseBlock />
          <label htmlFor="images">
            <img src={selectSVG} alt="approve.svg" />
            Choose
          </label>
          <input
            type="file"
            id="images"
            onChange={(e) => addImageHandler(e)}
            accept="image/*"
            multiple
          />
        </UploadImageElementBtnPanel>

        <UploadImageElementList>
          {downloadList.map((item, index) => {
            return (
              <UploadImageElementPicture key={index}>
                <UploadImageElementImg>
                  <img src={item} alt="client" />
                </UploadImageElementImg>
                <UploadImageElementOwnersLabel htmlFor="owners">
                  owners:
                </UploadImageElementOwnersLabel>
                <UploadImageElementOwners
                  onChange={(e) => ownerChangeHandler(e, index)}
                  type="text"
                  name="owners"
                  placeholder={ownersList[index] || "default"}
                  value={ownersList[index]}
                />
                <button type="button" onClick={() => deleteImageHandler(item)}>
                  <img src={deleteSVG} alt="delete.svg" /> Delete
                </button>
              </UploadImageElementPicture>
            );
          })}
        </UploadImageElementList>
      </form>
    </UploadImageElement>
  );
};

const BtnFormSubmit = () => {
  return (
    <StyledSubmitBtn type="submit">
      <img src={approvedSVG} alt="approve.svg" /> Confirm
    </StyledSubmitBtn>
  );
};

export default UploadImage;
