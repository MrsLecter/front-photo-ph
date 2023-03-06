import { userSlice } from "@/components/store/reducers/userSlice";
import {
  LOGIN_REGEXP,
  PASSWORD_REGEXP,
  TWENTY_FOUR_HOURS_IN_MS,
  AppUrlsEnum,
} from "@const";
import { useAppDispatch } from "@hooks/reducers-hooks";
import { useInput } from "@hooks/use-input";
import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import Logo from "@common/logo/Logo";
import Header from "@common/header/Header";
import {
  FormInput,
  FormLabel,
  FormMain,
} from "@common/formElements/FormElements";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import ButtonSubmit from "@common/buttons/ButtonSubmit";
import requestHandler from "@/api/fetch-request-handler";
import { ILoginResponse } from "@/api/fetch-requests-handler.types";
import WrapperContent from "@wrappers/wrapperContent/WrapperContent";
import localStorageHandler from "@/components/utils/localStoragehandler";
import WrapperCenter from "@wrappers/wrapperCenter/wrapperCenter";

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
        const loginResponse: ILoginResponse = await requestHandler.login({
          login,
          password,
        });
        const { refreshtoken, token, status, message } = loginResponse;
        if (status === 200) {
          localStorageHandler.setPhotographerData({
            accessToken: token,
            refreshToken: refreshtoken,
            expiresIn: new Date().getTime() + TWENTY_FOUR_HOURS_IN_MS,
          });
          dispatch(
            enroll({
              accessToken: token,
              refreshToken: refreshtoken,
            })
          );

          navigate("../");
        } else if (status === 406) {
          navigate("../" + AppUrlsEnum.REG);
        } else {
          navigate("../" + AppUrlsEnum.INFO + `/${message}`);
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
        <WrapperCenter>
          <WrapperContent>
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
              <FormLabel text={"Password:"} />
              <FormInput
                inputIsValid={passwordIsValid}
                inputType={"password"}
                inputName={"password"}
                inputValue={password}
                onChangeHandler={passwordChangeHandler}
              />
              <ButtonSubmit label={"Login"} />
            </FormMain>
          </WrapperContent>
        </WrapperCenter>
      </WrapperPage>
    </div>
  );
};
