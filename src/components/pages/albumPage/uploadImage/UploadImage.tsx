import { useAppSelector } from "@hooks/reducers-hooks";
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
} from "./UploadImage.styles";
import deleteSVG from "@images/delete.svg";
import approvedSVG from "@images/approved.svg";
import selectSVG from "@images/select.svg";
import requestHandler from "@/api/fetch-request-handler";

const UploadImage: React.FC<{ albumName: string }> = ({ albumName }) => {
  const { accessToken } = useAppSelector((store) => store.userReducer);
  const [downloadList, setDownloadList] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | null>();
  const [ownersList, setOwnersList] = useState<string[]>([]);
  const [inputfiles, setFiles] = useState<File[]>();
  const navigate = useNavigate();

  const addImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const imagesArray:any[] = [];
    // const reader = new FileReader();
    // for(let i =0; i < event.target.files!.length; i++){
    //   reader.addEventListener("load", () => {
    //     imagesArray.push(reader.result);
    //   });
    //   reader.readAsDataURL(event.target.files![i]);
    // }
    console.log("add click");
    const imagesTarget = event.target.files;
    console.log("imagesTarget", imagesTarget);
    setFiles(Array.from(imagesTarget!));
    const imagesArray = Array.from(imagesTarget!).map((img) => {
      console.log(img);
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
    console.log("click", index, event.target.value);
    ownersList[index] = event.target.value;
  };

  const confirmClickHandler = () => {
    console.log("confirm");
    navigate(-1);
  };

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
    console.log("downloadList", downloadList);

    //     console.log("after reader: ", blobToBase64(downloadList[0]));
    // console.log("form submit", downloadList);
    // console.log("owners list", ownersList);

    // const shippingData = [];
    // for (let i = 0; i < downloadList.length; i++) {
    //   shippingData[i] = {
    //     photo_url: downloadList[i],
    //     owners: ownersList[i] || "default",
    //   };
    // }
    // console.log(shippingData, "downloadList", downloadList);

    // let formData = new FormData();
    // formData.append("album", albumName);
    // for (let j = 0; j < downloadList.length; j++) {
    //   var res = await fetch(downloadList[j]);
    //   var blob = await res.blob();
    //   formData.append("photos", blob);
    // }
    let formData = new FormData();
    formData.append("album", albumName);
    console.log("inputFiles", inputfiles);
    if (inputfiles) {
      let ownersData = "";
      console.log("owners list", ownersList);
      for (let i = 0; i < inputfiles.length; i++) {
        formData.append("photos", inputfiles[i]);
        ownersData += ownersList[i] || "default";
        if (i !== inputfiles.length - 1) {
          ownersData += "*";
        }
      }
      console.log("ownersData : ", ownersData);
      formData.set("users", ownersData);
    }
    const response: any = await requestHandler.postPhotos(
      accessToken,
      formData
    );
    console.log("post photos response: ", response);
    if (response.status === 201) {
      console.log("status 201");
      navigate(`/albums`);
    } else {
      navigate(`/info/${"photo not sent! Try again!"}`);
    }
  };

  return (
    <UploadImageElement>
      <UploadImageElementLogo>Upload your images</UploadImageElementLogo>

      <form name="photos" onSubmit={submitFormHandler} method="post">
        <UploadImageElementBtnPanel>
          <button onClick={confirmClickHandler} type="submit">
            <img src={approvedSVG} alt="approve.svg" /> Confirm
          </button>
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

export default UploadImage;
