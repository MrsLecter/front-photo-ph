import { ErrorMessage, Label, Input, MainForm } from "./FormElements.styles";
import { IFormInputProps, IFormMainProps } from "./FormElements.types";

export const FormLabel: React.FC<{ text: string }> = ({ text }) => {
  return <Label>{text}</Label>;
};

export const FormErrorMessage: React.FC<{ text: string }> = ({ text }) => {
  return <ErrorMessage>{text}</ErrorMessage>;
};

export const FormInput: React.FC<IFormInputProps> = ({
  inputIsValid,
  inputType,
  inputName,
  onChangeHandler,
  inputValue,
}) => {
  return (
    <Input
      isValid={inputIsValid}
      type={inputType}
      name={inputName}
      onChange={onChangeHandler}
      value={inputValue}
      maxLength={20}
    />
  );
};

export const FormMain: React.FC<IFormMainProps> = (props) => {
  return (
    <MainForm onSubmit={props.onFormSubmit} method="POST" name={props.formName}>
      {props.children}
    </MainForm>
  );
};
