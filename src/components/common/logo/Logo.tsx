import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import photodropLogoPNG from "@images/photodrop_logo.png";

const Logo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledLogo onClick={() => navigate("../")}>
      <img src={photodropLogoPNG} alt="logo" />
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 55px;
  margin: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-top: 1px solid #f1f0ec;
  border-bottom: 1px solid #f1f0ec;
  z-index: 1;

  img {
    width: 125px;
    height: 16px;
  }

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 1440px) {
    height: 60px;

    img {
      width: 179px;
      height: 22px;
    }
  }
`;

export default Logo;
