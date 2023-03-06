import styled from "styled-components";

interface IWrapperContentProps {
  children: React.ReactNode;
}

const StyledWrapperContent = styled.div`
  overflow: hidden;
  
`;

const WrapperContent: React.FC<IWrapperContentProps> = ({ children }) => {
  return <StyledWrapperContent>{children}</StyledWrapperContent>;
};

export default WrapperContent;
