import { LOGIN_REGEXP } from "@const";
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

export const AlbumCreate: React.FC = () => {
  const { accessToken } = useAppSelector((store) => store.userReducer);
  const navigation = useNavigation();

  //TODO: check token

  // useEffect(() => {
  //   const getTokenInformaion = async () => {
  //     try {
  // const response: AxiosResponseType =
  //   await makePageRequestWithInterceptor(authCntx, ALBUM_CREATE);
  // if (response.data.status === "error") {
  //   console.error("Error!", response.data);
  //   setTokenInfo("Error!");
  //   navigate("/login");
  // }
  // if (response.data.body?.status === "ok") {
  //   const { message } = response.data.body;
  //   setTokenInfo(message as string);
  // }
  //     } catch (err: any) {
  //       console.error("Error in getTokenInformaion: ", err);
  //     }
  //   };
  // });

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
        console.log("not ok");
      } else {
        console.log(datapicker, datapicker.split("-"));
        let dateTuple = datapicker.split("-");
        console.log("ok", "request obj:", {
          albumlocation: location,
          albumname: name,
          date: new Date(
            parseInt(dateTuple[0]),
            parseInt(dateTuple[1]),
            parseInt(dateTuple[2])
          ),
        });

        try {
          const response: IInfoResponse = await requestHandler.postAlbum({
            accessToken,
            albumObject: {
              albumlocation: location,
              albumname: name,
              date: new Date(
                parseInt(dateTuple[0]),
                parseInt(dateTuple[1]),
                parseInt(dateTuple[2])
              ),
            },
          });
          const { message, status } = response;
          if (status === 201) {
            navigate("/albums");
          } else {
            navigate(`/info/${message}`);
          }
          console.log("response postNewAlbum ", response);
        } catch (err: any) {
          console.error(new Error(err));
        }
      }
    }
  };
  return (
    <WrapperPage>
      {navigation.state === "loading" ? <LoadingBlock /> : <></>}
      <Logo />
      <ButtonClose />
      <FormMain onFormSubmit={onFormSubmit} formName={"addAlbumForm"}>
        <FormLabel text={"Name"} />
        <FormInput
          onChangeHandler={nameChangeHandler}
          inputType="text"
          inputName="name"
          inputIsValid={nameIsValid}
          inputValue={name}
        />
        {nameIsValid ? (
          <FormErrorMessage text={""} />
        ) : name.length === 0 ? (
          <FormErrorMessage text={"Field must not be empty"} />
        ) : (
          <FormErrorMessage text={"Error: invalid name"} />
        )}
        <FormLabel text={"Location"} />
        <FormInput
          onChangeHandler={locationChangeHandler}
          inputType="text"
          inputName="location"
          inputIsValid={locationIsValid}
          inputValue={location}
        />
        {locationIsValid ? (
          <FormErrorMessage text={""} />
        ) : location.length === 0 ? (
          <FormErrorMessage text={"Field must not be empty"} />
        ) : (
          <FormErrorMessage text={"Error: invalid location"} />
        )}
        <FormLabel text="Datapicker" />
        <FormInput
          onChangeHandler={datapickerChangeHandler}
          inputType="date"
          inputName="datapicker"
          inputIsValid={datapickerIsValid}
          inputValue={datapicker}
        />
        {datapickerIsValid ? (
          <FormErrorMessage text={""} />
        ) : datapicker.length === 0 ? (
          <FormErrorMessage text={"Field must not be empty"} />
        ) : (
          <FormErrorMessage text={"Error: invalid datapicker"} />
        )}
        <ButtonSubmit
          buttonHandler={() => console.log("submit")}
          label={"Save"}
        />
      </FormMain>
    </WrapperPage>
  );
};
