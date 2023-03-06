import styled from "styled-components";
import { motion } from "framer-motion";

export const BtnSubmit = styled(motion.button)`
  width: 345px;
  height: 50px;
  margin: 0 auto;
  border: none;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.button.background};
  color: #ffffff;
  font-family: "Futura";
  font-weight: 600;
  font-size: 18px;
  line-height: 23.08px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.button.background_hovered_light};
  }
`;

interface IBtnSubmitProps {
  label: string;
  buttonHandler?: (e: React.MouseEvent) => void;
}

const ButtonSubmit: React.FC<IBtnSubmitProps> = ({ label, buttonHandler }) => {
  return (
    <BtnSubmit onClick={buttonHandler} type="submit" whileTap={{ scale: 0.9 }}>
      {label}
    </BtnSubmit>
  );
};

export default ButtonSubmit;
