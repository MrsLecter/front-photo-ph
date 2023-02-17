import { Link } from "react-router-dom";
import { useAppSelector } from "@hooks/reducers-hooks";

import ButtonMenu from "./buttonMenu/ButtonMenu";

import mainLogoPNG from "@images/main_logo.png";
import { AppUrlsEnum, MAIN_MENU_BUTTONS } from "@const";
import {
  Wrapper,
  HomePage,
  HomePageLogo,
  HomePageHeader,
  HomePageBtnList,
  HomePageGreeting,
} from "./Home.styles";

const Home: React.FC = () => {
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);
  return (
    <Wrapper>
      <HomePage>
        <HomePageLogo>
          <img src={mainLogoPNG} alt="mainLogo.png" />
        </HomePageLogo>
        <HomePageHeader>Photographers</HomePageHeader>
        {isLoggedIn ? (
          <HomePageBtnList>
            {MAIN_MENU_BUTTONS.map((item) => {
              return (
                <li key={item.id + 20}>
                  <ButtonMenu key={item.id} label={item.label} way={item.way} />
                </li>
              );
            })}
          </HomePageBtnList>
        ) : (
          <HomePageGreeting>
            <p>Welcome! 🤗 Good to see you!</p>
            <p>
              You need to <Link to={AppUrlsEnum.LOGIN}>log in</Link> to use the
              service
            </p>
            <p>
              <Link to={AppUrlsEnum.REG}>Register</Link> if this is your first
              time here
            </p>
          </HomePageGreeting>
        )}
      </HomePage>
    </Wrapper>
  );
};

export default Home;
