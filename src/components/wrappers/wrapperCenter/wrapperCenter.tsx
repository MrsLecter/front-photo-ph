import styled from "styled-components";

interface IWrapperCenterProps {
  children: React.ReactNode;
}

const StyledWrapperCenter = styled.div`
  box-sizing: border-box;
  width: 100vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

const WrapperCenter: React.FC<IWrapperCenterProps> = ({ children }) => {
  return <StyledWrapperCenter>{children}</StyledWrapperCenter>;
};

export default WrapperCenter;
