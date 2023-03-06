import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

import backSVG from "@images/back.svg";

const BtnBack = styled(motion.button)`
  position: absolute;
  top: 53px;
  float: left;
  width: 40px;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -48px;
  margin-left: 20px;
  border: none;
  border-radius: 6px;
  font-family: "Futura";
  font-weight: 600;
  font-size: 18px;
  line-height: 23.08px;
  background-color: white;
  color: ${({ theme }) => theme.text.main};
  object-fit: cover;
  z-index: 3;

  img {
    width: 30px;
    height: 30px;
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.input.border};
  }
`;

const ButtonBack: React.FC = () => {
  const navigate = useNavigate();
  const backToAlbumHandler = () => {
    navigate(-1);
  };
  return (
    <BtnBack
      onClick={backToAlbumHandler}
      type="button"
      whileTap={{ scale: 0.9 }}
    >
      <img src={backSVG} alt="back.svg" />
    </BtnBack>
  );
};

export default ButtonBack;
