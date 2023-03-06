import closeSVG from "../../../assets/images/close.svg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AppUrlsEnum } from "@const";

const BtnClose = styled(motion.button)`
  position: absolute;
  top: 54px;
  float: left;
  width: 40px;
  height: 41px;
  margin-top: -48px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 6px;
  font-family: "Futura";
  font-weight: 600;
  font-size: 18px;
  line-height: 23.08px;
  background-color: white;
  color: ${({ theme }) => theme.text.main};
  object-fit: cover;

  img {
    width: 40px;
    height: 40px;
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.input.border};
  }
`;

const ButtonClose: React.FC = () => {
  const navigate = useNavigate();
  const closeModalHandler = () => {
    navigate("../");
  };
  return (
    <BtnClose
      onClick={closeModalHandler}
      type="button"
      whileTap={{ scale: 0.9 }}
    >
      <img src={closeSVG} alt="close.svg" />
    </BtnClose>
  );
};

export default ButtonClose;
