import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalDiv = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 30vh;
  left: calc(50vw - (375px / 2));
  width: 375px;
  height: 375px;
  z-index: 6;
  overflow: hidden;
  background-color: white;
  border: 1px solid black;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
`;
