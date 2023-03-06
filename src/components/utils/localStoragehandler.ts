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

  public getPhotographersData(): ILocalStorageData | undefined {
    const photographerData = localStorage.getItem("photographer");

    if (photographerData) {
      const photographerDataObject = JSON.parse(photographerData);
      return photographerDataObject;
    }
  }

  public isPhotographerExist() {
    return !!localStorage.getItem("photographer");
  }

  public deletePhotographersData() {
    localStorage.removeItem("photographer");
  }
}

const localStorageHandler = new LocalStorageHandler();

export default localStorageHandler;

interface ILocalStorageData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
