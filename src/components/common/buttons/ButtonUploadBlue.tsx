import styled from "styled-components";
import uploadSVG from "@images/upload-white.svg";

export const ButtonUploadBlue: React.FC<IButtonUploadProps> = ({
  buttonHandler,
}) => {
  return (
    <BtnUpload onClick={buttonHandler} type="button">
      <img src={uploadSVG} alt="upload.svg" />
      Upload
    </BtnUpload>
  );
};

interface IButtonUploadProps {
  buttonHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const BtnUpload = styled.button`
  width: 345px;
  height: 50px;
  margin: 50px auto 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.button.background};
  color: #ffffff;
  font-family: "Futura";
  font-weight: 600;
  font-size: 18px;
  line-height: 23.08px;
  object-fit: cover;

  img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.button.background_hovered_light};
  }
`;
