import LogoInfo from "@common/logoInfo/LogoInfo";
import ButtonSubmit from "@common/buttons/ButtonSubmit";
import Header from "@common/header/Header";
import Logo from "@common/logo/Logo";
import WrapperPage from "@/components/wrappers/wrapperPage/WrapperPage";

import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AppUrlsEnum } from "@const";

const InfoPage = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 14px;
`;

const InfoPageWrapper = styled.div`
  width: 345px;
  margin: 0 auto;
`;

const InfoPageMessage = styled.div`
  width: 345px;
  height: 27px;
  margin-bottom: 400px;
  font-family: "Futura";
  font-weight: 400;
  font-size: 18px;
  text-transform: uppercase;
  line-height: 23.08px;
  text-align: center;
  color: $text_second;
`;

export const Info: React.FC = () => {
  const navigate = useNavigate();
  const message = useParams().message || "message not found";
  const goBackHandler = () => {
    navigate(AppUrlsEnum.HOME);
  };
  return (
    <WrapperPage>
      <Logo />
      <LogoInfo />
      <Header label={"🤔 Something happened"} />
      <InfoPage>
        <InfoPageWrapper>
          <InfoPageMessage>
            {message
              ? message
              : "Oops! Unexpected error! Refresh page to continue"}
          </InfoPageMessage>
          <ButtonSubmit label={"Go back"} buttonHandler={goBackHandler} />
        </InfoPageWrapper>
      </InfoPage>
    </WrapperPage>
  );
};
