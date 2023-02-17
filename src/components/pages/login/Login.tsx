import { userSlice } from "@/components/store/reducers/userSlice";
import { LOGIN_REGEXP, PASSWORD_REGEXP, EMAIL_REGEXP } from "@const";
import { useAppDispatch, useAppSelector } from "@hooks/reducers-hooks";
import { useInput } from "@hooks/use-input";
import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import Logo from "@common/logo/Logo";
import Header from "@common/header/Header";
import {
  FormErrorMessage,
  FormInput,
  FormLabel,
  FormMain,
} from "@common/formElements/FormElements";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import ButtonSubmit from "@common/buttons/ButtonSubmit";
import requestHandler from "@/api/fetch-request-handler";
import { ILoginResponse } from "@/api/fetch-requests-handler.types";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { enroll } = userSlice.actions;
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

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!login || !password) {
      alert("Error: login or password not valid!");
      console.error("Error: login or password not valid!");
      return;
    }
    if (loginIsValid && passwordIsValid) {
      setIsLoading(true);
      try {
        const response: ILoginResponse = await requestHandler.login({
          login,
          password,
        });
        const { refreshtoken, token, status, message } = response;
        if (status === 200) {
          dispatch(
            enroll({
              accessToken: token,
              refreshToken: refreshtoken,
            })
          );
          navigate("/albums");
        } else {
          navigate(`/info/${message}`);
        }
      } catch (err: unknown) {
        console.error(new Error(err as string));
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div>
      <WrapperPage>
        {isLoading ? <LoadingBlock /> : <></>}
        {navigation.state === "loading" ? <LoadingBlock /> : <></>}
        <Logo />
        <Header label="Let’s get started" />
        <FormMain onFormSubmit={onFormSubmit} formName={"signupform"}>
          <FormLabel text={"Login:"} />
          <FormInput
            inputIsValid={loginIsValid}
            inputType={"text"}
            inputName={"login"}
            inputValue={login}
            onChangeHandler={loginChangeHandler}
          />
          {loginIsValid ? (
            <FormErrorMessage text={""} />
          ) : login.length === 0 ? (
            <FormErrorMessage text={"Field must not be empty"} />
          ) : (
            <FormErrorMessage text={"Error: invalid login"} />
          )}

          <FormLabel text={"Password:"} />
          <FormInput
            inputIsValid={passwordIsValid}
            inputType={"password"}
            inputName={"password"}
            inputValue={password}
            onChangeHandler={passwordChangeHandler}
          />
          {passwordIsValid ? (
            <FormErrorMessage text={""} />
          ) : password.length === 0 ? (
            <FormErrorMessage text={"Field must not be empty"} />
          ) : (
            <FormErrorMessage text={"Error: invalid pasword"} />
          )}
          <ButtonSubmit
            buttonHandler={() => console.log("submit")}
            label={"Login"}
          />
        </FormMain>
      </WrapperPage>
    </div>
  );
};
