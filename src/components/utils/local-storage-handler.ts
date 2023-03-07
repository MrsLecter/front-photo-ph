class LocalStorageHandler {
  public setPhotographerData({ accessToken, refreshToken }: ILocalStorageData) {
    const photogrepherData = {
      accessToken,
      refreshToken,
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

  public getAccessToken() {
    const photographerData = localStorage.getItem("photographer");

    if (photographerData) {
      const photographerDataObject = JSON.parse(photographerData);
      return photographerDataObject.accessToken;
    }
  }

  public getRefreshToken() {
    const photographerData = localStorage.getItem("photographer");

    if (photographerData) {
      const photographerDataObject = JSON.parse(photographerData);
      return photographerDataObject.refreshToken;
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
}
