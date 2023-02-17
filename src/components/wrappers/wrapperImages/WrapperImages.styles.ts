import styled from "styled-components";

export const Images = styled.div<{ isOneColumn: boolean }>`
  box-sizing: border-box;
  margin: 0 auto;
  width: 345px;
  columns: ${(props) => (props.isOneColumn ? "1 345px" : "2 160px")};
  gap: 8px;

  div:nth-child(1) {
    margin-top: 0px;
  }
`;
export const Item = styled.div`
  margin: 8px auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  background-color: lightgray;

  img {
    width: 100%;
    transition: all 0.5s ease;
  }

  &:hover {
    cursor: pointer;
    img {
      transform: scale(1.2);
    }
  }
`;
