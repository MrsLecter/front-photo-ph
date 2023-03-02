import styled from "styled-components";
import uploadSVG from "@images/upload.svg";
import { motion } from "framer-motion";

export const ButtonUpload: React.FC<ButtonUploadProps> = ({
  buttonHandler,
}) => {
  return (
    <BtnUpload onClick={buttonHandler} type="button" whileTap={{ scale: 0.9 }}>
      <img src={uploadSVG} alt="upload.svg" />
      Upload
    </BtnUpload>
  );
};

interface ButtonUploadProps {
  buttonHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const BtnUpload = styled(motion.button)`
  width: 120px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: none;
  color: ${({ theme }) => theme.text.main};
  font-family: "Futura";
  font-weight: 600;
  font-size: 18px;
  line-height: 23.08px;
  object-fit: cover;

  img {
    width: 40px;
    height: 40px;
  }
`;
