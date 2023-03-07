import { useNavigate } from "react-router-dom";
import iconSVG from "@images/icon2.svg";
import { AppUrlsEnum } from "@const";
import {
  Album,
  AlbumIcon,
  AlbumName,
  AlbumWrapper,
  AlbumLocation,
  AlbumDatapicker,
} from "./AlbumFolder.styles";

interface IAlbumFolderProps {
  id: number;
  name: string;
  location: string;
  icon: string | null;
  datapicker: string;
}

export const AlbumFolder: React.FC<IAlbumFolderProps> = (props) => {
  const navigator = useNavigate();
  const pickAlbumHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const div = event.currentTarget;
    const albumName = div.getAttribute("data-album-name");

    navigator("../" + AppUrlsEnum.ALBUM_PAGE + `/${albumName!.toLowerCase()}`);
  };
  return (
    <Album onClick={(e) => pickAlbumHandler(e)} data-album-name={props.name}>
      <AlbumIcon>
        <img src={props.icon ? props.icon : iconSVG} alt="folderIco.png" />
      </AlbumIcon>
      <AlbumWrapper>
        <AlbumName>{props.name}</AlbumName>
        <AlbumLocation>{props.location}</AlbumLocation>
      </AlbumWrapper>
      <AlbumDatapicker>{props.datapicker}</AlbumDatapicker>
    </Album>
  );
};
