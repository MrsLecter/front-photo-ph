import styled from "styled-components";

interface IWrapperContentProps {
  children: React.ReactNode;
}

const StyledWrapperContent = styled.div`
  position: relative;
  min-height: 600px;
  margin: 55px auto 0;
  overflow: hidden;

  @media (min-width: 375px) {
    margin-top: 60px;
  }
`;

const WrapperContent: React.FC<IWrapperContentProps> = ({ children }) => {
  return <StyledWrapperContent>{children}</StyledWrapperContent>;
};

export default WrapperContent;
