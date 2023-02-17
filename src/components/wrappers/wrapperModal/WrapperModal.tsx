import ReactDOM from "react-dom";
import { Backdrop, ModalDiv } from "./WrapperModal.styles";
import {
  IBackScreenProps,
  IModalProps,
  IWrapperModalProps,
} from "./WrapperModal.types";

const backdrop = document.getElementById("backdrop");
const overlay = document.getElementById("overlay");

const BackScreen = ({ backClickHandler }: IBackScreenProps) => {
  return <Backdrop onClick={backClickHandler} />;
};

const ModalWindow: React.FC<IModalProps> = ({ children }) => {
  return <ModalDiv>{children}</ModalDiv>;
};

if (!overlay || !backdrop || (!backdrop && !overlay)) {
  throw Error("Element 'overlay' or/and 'backdrop' not assigned in DOM");
}

const WrapperModal = ({ children, backClickHandler }: IWrapperModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackScreen backClickHandler={backClickHandler} />,
        backdrop
      )}
      {ReactDOM.createPortal(<ModalWindow children={children} />, overlay)}
    </>
  );
};

export default WrapperModal;
