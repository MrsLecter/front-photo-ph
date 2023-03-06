import Header from "@common/header/Header";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import Logo from "@common/logo/Logo";
import {
  AppUrlsEnum,
  EMAIL_REGEXP,
  FULLNAME_REGEXP,
  LOGIN_REGEXP,
  PASSWORD_REGEXP,
} from "@const";
import { useInput } from "@hooks/use-input";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { LegalLinks } from "./legalLinks/LegalLinks";
import {
  FormInput,
  FormLabel,
  FormMain,
} from "@common/formElements/FormElements";
import ButtonSubmit from "@common/buttons/ButtonSubmit";
import requestHandler from "@/api/fetch-request-handler";
import { IInfoResponse } from "@/api/fetch-requests-handler.types";
import WrapperContent from "@wrappers/wrapperContent/WrapperContent";

export const Registration: React.FC = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    value: login,
    error: loginIsValid,
    changeHandler: loginChangeHandler,
  } = useInput({ regexp: LOGIN_REGEXP, allowEmpty: false });

  const {
    value: password,
    error: passwordIsValid,
    changeHandler: passwordChangeHandler,
  } = useInput({ regexp: PASSWORD_REGEXP, allowEmpty: false });

  const {
    value: fullname,
    error: fullnameIsValid,
    changeHandler: fullnameChangeHandler,
  } = useInput({ regexp: FULLNAME_REGEXP, allowEmpty: true });

  const {
    value: email,
    error: emailIsValid,
    changeHandler: emailChangeHandler,
  } = useInput({ regexp: EMAIL_REGEXP, allowEmpty: true });

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!login || !password) {
      alert("Fields login and password cannot be empty!");
      console.error("Error: login or password not valid!");
      return;
    }

    if (loginIsValid && passwordIsValid) {
      setIsLoading(true);
      try {
        const registrationResponse: IInfoResponse =
          await requestHandler.registration(login, password, email, fullname);

        const { status, message } = registrationResponse;
        navigate("../" + AppUrlsEnum.INFO + `/${message}`);
      } catch (err: unknown) {
        console.error("Error in makeRegistrationRequest: ", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert(
        "Invalid fields! Correct the errors:\n 1) login contain only letters and '_',\n 2)Minimum password length: 8 symbols,\n 3) Capitalize fullname,\n 4)Correct email"
      );
    }
  };
  return (
    <WrapperPage>
      {isLoading ? <LoadingBlock /> : <></>}
      {navigation.state === "loading" ? <LoadingBlock /> : <></>}
      <Logo />
      <WrapperContent>
        <Header label="Let’s get started" top="20" />
        <FormMain onFormSubmit={onFormSubmit} formName={"signupform"}>
          <FormLabel text={"Login*:"} />
          <FormInput
            inputIsValid={loginIsValid}
            inputType={"text"}
            inputName={"login"}
            inputValue={login}
            onChangeHandler={loginChangeHandler}
          />
          <FormLabel text={"Password*:"} />
          <FormInput
            inputIsValid={passwordIsValid}
            inputType={"password"}
            inputName={"password"}
            inputValue={password}
            onChangeHandler={passwordChangeHandler}
          />
          <FormLabel text={"Fullname:"} />
          <FormInput
            inputIsValid={fullnameIsValid}
            inputType={"text"}
            inputName={"fullname"}
            inputValue={fullname}
            onChangeHandler={fullnameChangeHandler}
          />
          <FormLabel text={"Email:"} />
          <FormInput
            inputIsValid={emailIsValid}
            inputType={"email"}
            inputName={"email"}
            inputValue={email}
            onChangeHandler={emailChangeHandler}
          />
          <ButtonSubmit label={"Registration"} />
        </FormMain>
        <LegalLinks />
      </WrapperContent>
    </WrapperPage>
  );
};
