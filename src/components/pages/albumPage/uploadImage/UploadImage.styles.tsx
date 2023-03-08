import styled from "styled-components";

export const UploadImageElement = styled.div`
  width: 100%;
  height: 100%;
`;

export const UploadImageElementLogo = styled.div`
  padding: 10px;
  text-align: center;
  font-family: "Futura";
  font-weight: 600;
  font-size: 28px;
  line-height: 23.08px;
  border: 1px solid #f1f0ec;
`;

export const StyledSubmitBtn = styled.button`
  margin-tom: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 120px;
  border: 1px solid black;
  border: none;
  height: 40px;
  font-family: "Futura";
  font-weight: 600;
  font-size: 18px;
  line-height: 23.08px;
  background-color: white;
  color: ${({ theme }) => theme.text.main};

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;

export const UploadImageElementBtnPanel = styled.div`
  margin-top: -47px;
  padding: 10px;
  width: 345px;
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  input {
    visibility: hidden;
    position: absolute;
    z-index: -2;
    width: 120px;
    background-color: red;
    height: 40px;
  }

  & > input:nth-child(1) {
    visibility: visible;
    // display: flex;
    // flex-direction: row;
    // align-items: center;
    // justify-content: center;
    // width: 120px;
    // border: 1px solid black;
    // border: none;
    // height: 40px;
    // font-family: "Futura";
    // font-weight: 600;
    // font-size: 18px;
    // line-height: 23.08px;
    // background-color: white;
    // color: ${({ theme }) => theme.text.main};
  }

  button:hover {
    color: ${({ theme }) => theme.swich_background};
    cursor: pointer;
    background-color: ${({ theme }) => theme.input.border};
  }

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 40px;
    background-color: white;
    color: ${({ theme }) => theme.text.main};
    font-family: "Futura";
    font-weight: 600;
    font-size: 18px;
    line-height: 23.08px;

    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }

    &:hover {
      color: ${({ theme }) => theme.swich_background};
      cursor: pointer;
      background-color: ${({ theme }) => theme.input.border};
    }
  }
`;

export const UploadImageElementChooseBlock = styled.div`
  position: relative;
`;

export const UploadImageElementChooseLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  background-color: white;
  color: ${({ theme }) => theme.text.main};
  font-family: "Futura";
  font-weight: 600;
  font-size: 18px;
  line-height: 23.08px;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  &:hover {
    color: ${({ theme }) => theme.swich_background};
    cursor: pointer;
    background-color: ${({ theme }) => theme.input.border};
  }
`;

export const UploadImageElementList = styled.div`
  height: 250px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const UploadImageElementPicture = styled.div`
  margin: 0 auto;
  width: 345px;
  height: 64px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.button.background};

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: none;
    width: 120px;
    height: 40px;
    background-color: white;
    color: ${({ theme }) => theme.text.main};

    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }

  button:hover {
    color: ${({ theme }) => theme.swich_background};
    cursor: pointer;
    background-color: ${({ theme }) => theme.input.border};
  }
`;

export const UploadImageElementImg = styled.div`
  width: 70px;
  height: 40px;
  object-fit: cover;
  object-position: center center;
  img {
    width: 100%;
    height: 40px;
  }
`;

export const UploadImageElementOwners = styled.input`
  display: block;
  height: 20px;
  font-family: "Futura";
  font-weight: 500;
  font-size: 14px;
  line-height: 23.08px;
  color: ${({ theme }) => theme.text.second};
  width: 80px;
  margin-bottom: -28px;
  outline: none;
  border: none;
  padding-bottom: 0px;
  overflow: hidden;
`;

export const UploadImageElementOwnersLabel = styled.label`
  display: block;
  height: 20px;
  font-family: "Futura";
  font-weight: 500;
  font-size: 14px;
  line-height: 23.08px;
  color: ${({ theme }) => theme.text.second};
  width: 50px;
  margin-bottom: -25px;
  margin-left: 20px;
`;
