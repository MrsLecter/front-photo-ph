export interface IFormInputProps {
  inputIsValid: boolean;
  inputType: string;
  inputName: string;
  inputValue: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IFormMainProps {
  formName: string;
  children: JSX.Element[];
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
