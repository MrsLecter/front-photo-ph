import { Images, Item } from "./WrapperImages.styles";
import { IWrapperImagesProps } from "./WrapperImages.types";

export const WrapperImages = ({
  children,
  isOneColumn,
  pickImageHandler,
}: IWrapperImagesProps) => {
  return (
    <Images onClick={pickImageHandler} isOneColumn={isOneColumn}>
      {children}
    </Images>
  );
};

export const WrapperImagesItem = ({ children }: IWrapperImagesProps) => {
  return <Item>{children}</Item>;
};
