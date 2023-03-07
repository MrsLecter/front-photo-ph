import styled from "styled-components";

export const Album = styled.div`
  width: 345px;
  height: 64px;
  margin: 15px auto 0px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.button.background};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.input.border};
  }
`;

export const AlbumIcon = styled.div`
  width: 40px;
  height: 40px;
  margin: 0px 30px 0px 5px;
  object-fit: contain;

  img {
    width: 40px;
    height: 40px;
  }
`;

export const AlbumWrapper = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const AlbumName = styled.div`
  width: 180px;
  height: 21px;
  font-family: "Termina";
  font-weight: 400;
  font-size: 18px;
  color: ${({ theme }) => theme.text.main};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AlbumLocation = styled.div`
  width: 180px;
  height: 16.5px;
  font-family: "Futura";
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.text.second};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AlbumDatapicker = styled.div`
  width: 58px;
  font-family: "Futura";
  font-weight: 400;
  font-size: 12px;
  color: ${({ theme }) => theme.text.second}; ;
`;
