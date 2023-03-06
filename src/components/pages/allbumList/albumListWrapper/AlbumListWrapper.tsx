import styled from "styled-components";

const AlbumListWrapper: React.FC<IAlbumListWrapperProps> = ({ children }) => {
  return <ListWrapper>{children}</ListWrapper>;
};

interface IAlbumListWrapperProps {
  children: React.ReactNode;
}

const ListWrapper = styled.div`
  margin: 0 auto;
  padding: 20px 0px;
  width: 345px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default AlbumListWrapper;
