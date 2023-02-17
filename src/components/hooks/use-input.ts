import { useState, ChangeEvent } from "react";

export const useInput = (props: {
  regexp: RegExp | "none";
  allowEmpty: boolean;
}) => {
  const { regexp, allowEmpty } = props;

  const [input, setInput] = useState("");
  const [inputIsValid, setInputIsValid] = useState(true);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value.match(regexp)
      ? setInputIsValid(true)
      : setInputIsValid(false);
    if (allowEmpty && event.target.value.trim().length === 0) {
      setInputIsValid(true);
    }
    if (
      regexp === "none" &&
      !allowEmpty &&
      event.target.value.trim().length !== 0
    ) {
      setInputIsValid(true);
    }
    setInput(event.target.value);
  };

  return {
    value: input,
    error: inputIsValid,
    changeHandler: inputChangeHandler,
  };
};
