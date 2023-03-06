class LocalStorageHandler {
  public setPhotographerData({
    accessToken,
    refreshToken,
    expiresIn,
  }: ILocalStorageData) {
    const photogrepherData = {
      accessToken,
      refreshToken,
      expiresIn,
    };
    localStorage.setItem("photographer", JSON.stringify(photogrepherData));
  }

  public getPhotographersData(): ILocalStorageData {
    const photographerData = localStorage.getItem("photographer");

    if (photographerData) {
      const photographerDataObject = JSON.parse(photographerData);
      return photographerDataObject;
    } else {
      throw Error("Photographer data in local storage is null");
    }
  }

  public isPhotographerExist() {
    return !!localStorage.getItem("photographer");
  }
}

const localStorageHandler = new LocalStorageHandler();

export default localStorageHandler;

interface ILocalStorageData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
