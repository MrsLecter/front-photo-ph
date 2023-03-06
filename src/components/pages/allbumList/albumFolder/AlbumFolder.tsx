import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import iconSVG from "@images/icon2.svg";
import { AppUrlsEnum } from "@const";

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

const Album = styled.div`
  width: 345px;
  height: 64px;
  margin: 15px auto 0px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.button.background};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.input.border};
  }
`;

const AlbumIcon = styled.div`
  width: 40px;
  height: 40px;
  margin: 0px 30px 0px 5px;
  object-fit: contain;

  img {
    width: 40px;
    height: 40px;
  }
`;

const AlbumWrapper = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const AlbumName = styled.div`
  width: 180px;
  height: 21px;
  font-family: "Termina";
  font-weight: 400;
  font-size: 18px;
  color: ${({ theme }) => theme.text.main};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AlbumLocation = styled.div`
  width: 180px;
  height: 16.5px;
  font-family: "Futura";
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.text.second};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AlbumDatapicker = styled.div`
  width: 58px;
  font-family: "Futura";
  font-weight: 400;
  font-size: 12px;
  color: ${({ theme }) => theme.text.second}; ;
`;
