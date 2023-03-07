import { useNavigate } from "react-router-dom";
import WrapperPage from "@/components/wrappers/wrapperPage/WrapperPage";
import logoInfoSVG from "@images/camera-disabled.png";
import styled from "styled-components";
import WrapperCenter from "@wrappers/wrapperCenter/wrapperCenter";

const NotFound: React.FC = () => {
  const navigation = useNavigate();
  return (
    <WrapperPage>
      <WrapperCenter>
        <NotFoundPage>
          <img src={logoInfoSVG} alt="logoInfo.svg" />
          <h1>Oops!</h1>
          <NotFoundPageMessage>
            the page you were looking doesent exist
          </NotFoundPageMessage>

          <NotFoundPageBtn onClick={() => navigation("../")}>
            Go Home
          </NotFoundPageBtn>
        </NotFoundPage>
      </WrapperCenter>
    </WrapperPage>
  );
};

const NotFoundPage = styled.div`
  width: 375px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: "Futura";
  color: ${({ theme }) => theme.text.main};

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
  color: ${({ theme }) => theme.text.main};
`;

const NotFoundPageBtn = styled.button`
  width: 150px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.button.background};
  border-radius: 50px;
  font-family: "Futura";
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.button.background};
  background-color: white;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.button.background_hovered_dark};
    color: white;
  }
`;

export default NotFound;
