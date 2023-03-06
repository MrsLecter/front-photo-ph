import styled from "styled-components";

const CustomHeader = styled.div<{ marginTop: string }>`
  width: 100vw;
  height: 27px;
  margin-top: ${(props) => (props.marginTop ? props.marginTop + "px" : "136px")}
  margin-bottom: 14px;
  font-family: "Termina";
  font-weight: 700;
  font-size: 22px;
  line-height: 26.4px;
  text-align: center;
  overflow-x: hidden;
`;

interface IHeaderProps {
  label: string;
  top?: string;
}

const Header: React.FC<IHeaderProps> = ({ top, label }) => {
  return <CustomHeader marginTop={top || ""}>{label}</CustomHeader>;
};

export default Header;
