import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import WrapperPage from "@/components/wrappers/wrapperPage/WrapperPage";
import logoInfoSVG from "@images/camera-disabled.png";
import styled from "styled-components";

const NotFoundPage = styled.div`
  width: 375px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: "Futura";
  color: #262626;

  img {
    width: 81.8px;
    height: 75px;
    margin-top: 30px;
    margin-bottom: 80px;
  }
`;

const NotFoundPageMessage = styled.div`
  margin-top: 10px;
  margin-bottom: 50px;
  font-family: "Futura";
  text-transform: uppercase;
  text-align: center;
  font-size: 32px;
  font-weight: 400;
  color: #262626;
`;

const NotFoundPageBtn = styled(motion.button)`
  width: 150px;
  height: 40px;
  border: 1px solid #3300cc;
  border-radius: 50px;
  font-family: "Futura";
  font-size: 20px;
  font-weight: 600;
  color: #3300cc;
  background-color: white;

  &:hover {
    cursor: pointer;
    background-color: #2c00b0;
    color: white;
  }
`;

const NotFound: React.FC = () => {
  const navigation = useNavigate();
  return (
    <WrapperPage>
      <NotFoundPage>
        <img src={logoInfoSVG} alt="logoInfo.svg" />
        <h1>Oops!</h1>
        <NotFoundPageMessage>
          the page you were looking doesent exist
        </NotFoundPageMessage>

        <NotFoundPageBtn
          onClick={() => navigation("/")}
          whileTap={{ scale: 0.9 }}
        >
          Go Home
        </NotFoundPageBtn>
      </NotFoundPage>
    </WrapperPage>
  );
};

export default NotFound;
