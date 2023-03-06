import { AppUrlsEnum, LOGIN_REGEXP } from "@const";
import { useAppSelector } from "@hooks/reducers-hooks";
import { useInput } from "@hooks/use-input";
import { useNavigate, useNavigation } from "react-router-dom";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import Logo from "@common/logo/Logo";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import ButtonClose from "@common/buttons/ButtonClose";
import {
  FormErrorMessage,
  FormInput,
  FormLabel,
  FormMain,
} from "@common/formElements/FormElements";
import ButtonSubmit from "@common/buttons/ButtonSubmit";
import requestHandler from "@/api/fetch-request-handler";
import { IInfoResponse } from "@/api/fetch-requests-handler.types";
import WrapperContent from "@wrappers/wrapperContent/WrapperContent";

export const AlbumCreate: React.FC = () => {
  const { accessToken } = useAppSelector((store) => store.userReducer);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const {
    value: name,
    error: nameIsValid,
    changeHandler: nameChangeHandler,
  } = useInput({ regexp: LOGIN_REGEXP, allowEmpty: false });

  const {
    value: location,
    error: locationIsValid,
    changeHandler: locationChangeHandler,
  } = useInput({ regexp: LOGIN_REGEXP, allowEmpty: false });

  const {
    value: datapicker,
    error: datapickerIsValid,
    changeHandler: datapickerChangeHandler,
  } = useInput({ regexp: "none", allowEmpty: false });

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nameIsValid && locationIsValid && datapickerIsValid) {
      if (
        name.length === 0 ||
        location.length === 0 ||
        datapicker.length === 0
      ) {
        alert("Some fields are invalid!");
      }
      try {
        const response: IInfoResponse = await requestHandler.postAlbum({
          accessToken,
          albumObject: {
            albumlocation: location,
            albumname: name,
            date: datapicker,
          },
        });
        const { message, status } = response;
        if (status === 201) {
          navigate("../");
        } else {
          navigate("../" + AppUrlsEnum.INFO + `/${message}`);
        }
      } catch (err: any) {
        console.error(new Error(err));
      }
    } else {
      alert("Some fields are invalid!");
    }
  };
  return (
    <WrapperPage>
      {navigation.state === "loading" ? <LoadingBlock /> : <></>}
      <Logo />
      <ButtonClose />
      <WrapperContent>
        <FormMain onFormSubmit={onFormSubmit} formName={"addAlbumForm"}>
          <FormLabel text={"Name"} />
          <FormInput
            onChangeHandler={nameChangeHandler}
            inputType="text"
            inputName="name"
            inputIsValid={nameIsValid}
            inputValue={name}
          />
          <FormLabel text={"Location"} />
          <FormInput
            onChangeHandler={locationChangeHandler}
            inputType="text"
            inputName="location"
            inputIsValid={locationIsValid}
            inputValue={location}
          />
          <FormLabel text="Datapicker" />
          <FormInput
            onChangeHandler={datapickerChangeHandler}
            inputType="date"
            inputName="datapicker"
            inputIsValid={datapickerIsValid}
            inputValue={datapicker}
          />
          <ButtonSubmit label={"Save"} />
        </FormMain>
      </WrapperContent>
    </WrapperPage>
  );
};
