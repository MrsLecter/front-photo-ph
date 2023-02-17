import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import plusSVG from "@images/plus.svg";
import { AppUrlsEnum } from "@const";
import { motion } from "framer-motion";

const BtnAdd = styled(motion.button)`
  float: right;
  width: 70px;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -48px;
  margin-right: 30px;
  border: 1px solid #3300cc;
  border-radius: 6px;
  font-family: "Futura";
  font-weight: 600;
  font-size: 18px;
  line-height: 23.08px;
  background-color: white;
  color: #262626;
  object-fit: cover;
  img {
    width: 40px;
    height: 40px;
  }

  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
`;

const ButtonAdd: React.FC = () => {
  const navigate = useNavigate();
  const addAlbumHandler = () => {
    navigate("../" + AppUrlsEnum.ALBUM_CREATE);
  };
  return (
    <BtnAdd
      onClick={addAlbumHandler}
      type="button"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.9 }}
    >
      <img src={plusSVG} alt="plus.svg" />
    </BtnAdd>
  );
};

export default ButtonAdd;
