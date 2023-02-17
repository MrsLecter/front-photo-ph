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

export const UploadImageElementBtnPanel = styled.div`
  padding: 10px;
  width: 345px;
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  button {
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
    color: #262626;
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }

  button:hover {
    color: #592ce0f3;
    cursor: pointer;
    background-color: #eeeeee;
  }

  input {
    visibility: hidden;
    position: absolute;
    z-index: -2;
    width: 120px;
    height: 40px;
  }

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 40px;
    background-color: white;
    color: #262626;
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
      color: #592ce0f3;
      cursor: pointer;
      background-color: #eeeeee;
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
  color: #262626;
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
    color: #592ce0f3;
    cursor: pointer;
    background-color: #eeeeee;
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
  border-bottom: 1px solid #3300cc;

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: none;
    width: 120px;
    height: 40px;
    background-color: white;
    color: #262626;

    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }

  button:hover {
    color: #592ce0f3;
    cursor: pointer;
    background-color: #eeeeee;
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
  color: #6d6d6d;
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
  color: #6d6d6d;
  width: 50px;
  margin-bottom: -25px;
  margin-left: 20px;
`;
