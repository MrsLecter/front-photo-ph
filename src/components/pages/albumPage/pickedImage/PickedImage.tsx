import styled from "styled-components";

export const PickedImage: React.FC<{
  imageSrc: string;
  imageOwners: string;
}> = ({ imageSrc, imageOwners }) => {
  return (
    <Image>
      <img src={imageSrc} alt="client" />
      <ImageInfo>Owners: {imageOwners}</ImageInfo>
    </Image>
  );
};

const Image = styled.div`
  box-sizing: border-box;
  width: 345px;
  position: relative;
  object-fit: scale-down;
  object-position: center center;
  z-index: 6;

  img {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
`;

const ImageInfo = styled.div`
  position: absolute;
  width: 100%;
  height: 30px;
  padding: 8px;
  bottom: 0;
  left: 0;
  border: 1px solid black;
  background: rgba(0, 0, 0, 0.5);
  font-family: "Futura";
  font-weight: 400;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  z-index: 7;
`;
