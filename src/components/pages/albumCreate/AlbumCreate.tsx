import { AppUrlsEnum, LOGIN_REGEXP } from "@const";
import { useInput } from "@hooks/use-input";
import { useNavigate, useNavigation } from "react-router-dom";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import Logo from "@common/logo/Logo";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import ButtonClose from "@common/buttons/ButtonClose";
import {
  FormInput,
  FormLabel,
  FormMain,
} from "@common/formElements/FormElements";
import ButtonSubmit from "@common/buttons/ButtonSubmit";
import WrapperContent from "@wrappers/wrapperContent/WrapperContent";
import WrapperCenter from "@wrappers/wrapperCenter/wrapperCenter";
import albumsService from "@/api/albums-service";

export const AlbumCreate: React.FC = () => {
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
        const response = await albumsService.postAlbum({
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
      <WrapperCenter>
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
      </WrapperCenter>
    </WrapperPage>
  );
};
