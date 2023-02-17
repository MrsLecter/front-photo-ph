import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import iconSVG from "@images/icon2.svg";
import { motion } from "framer-motion";

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
    navigator(`./${albumName!.toLowerCase()}`);
  };
  return (
    <Album
      onClick={(e) => pickAlbumHandler(e)}
      data-album-name={props.name}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97, rotate: [0, 0, 3, -3, 0] }}
    >
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

const Album = styled(motion.div)`
  width: 345px;
  height: 64px;
  margin-top: 15px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid #3300cc;

  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
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
  color: #262626;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AlbumLocation = styled.div`
  width: 180px;
  height: 16.5px;
  font-family: "Futura";
  font-weight: 400;
  font-size: 14px;
  color: #6d6d6d;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AlbumDatapicker = styled.div`
  width: 58px;
  font-family: "Futura";
  font-weight: 400;
  font-size: 12px;
  color: #6d6d6d;
`;
