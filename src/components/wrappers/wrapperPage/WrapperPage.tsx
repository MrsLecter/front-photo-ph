import styled from "styled-components";

interface IWrapperPageProps {
  children: React.ReactNode;
}

const Page = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center 
  margin: 0 auto;
  overflow-x: hidden;
`;

const WrapperPage: React.FC<IWrapperPageProps> = ({ children }) => {
  return <Page>{children}</Page>;
};

export default WrapperPage;
