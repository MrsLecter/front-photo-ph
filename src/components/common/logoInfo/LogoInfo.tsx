import styled from "styled-components";
import logoInfoSVG from "@images/logo-info.svg";

const LogoInfo = () => {
  return (
    <LogoInfoElem>
      <img src={logoInfoSVG} alt="logoInfo.svg" />
    </LogoInfoElem>
  );
};

const LogoInfoElem = styled.div`
  width: 100vw;
  height: 75px;
  margin-top: 5.33vw;
  margin-bottom: 21px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  img {
    width: 81.8px;
    height: 75px;
  }

  @media (min-width: 1440px) {
    height: 100px;

    img {
      width: 110px;
      height: 100px;
    }
  }
`;

export default LogoInfo;
