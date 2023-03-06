import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reducers-hooks";
import { AlbumCreate } from "../pages/albumCreate/AlbumCreate";
import { AlbumPage } from "../pages/albumPage/AlbumPage";
import { AlbumList } from "../pages/allbumList/AlbumList";
import { Info } from "../pages/info/Info";
import { Policy } from "../pages/legalInfo/Policy";
import { Terms } from "../pages/legalInfo/Terms";
import { Login } from "../pages/login/Login";
import NotFound from "../pages/notFound/NotFound";
import { Registration } from "../pages/registration/Registration";

const RequireAuth = ({
  children,
  redirectTo,
}: {
  redirectTo: string;
  children: JSX.Element;
}) => {
  const { accessToken } = useAppSelector((store) => store.userReducer);
  return !!accessToken ? children : <Navigate to={redirectTo} />;
};

const albums_route_group_protected = [
  {
    path: "/albums/create",
    element: (
      <RequireAuth redirectTo="/">
        <AlbumCreate />
      </RequireAuth>
    ),
    errorElement: <Info />,
  },
  {
    path: "/",
    element: <AlbumList />,
    errorElement: <Info />,
  },
  {
    path: "albums/:albumName",
    element: (
      <RequireAuth redirectTo="/">
        <AlbumPage />
      </RequireAuth>
    ),
    errorElement: <Info />,
  },
];

const security_route_group = [
  {
    path: "/login",
    element: <Login />,
    errorElement: <Info />,
  },
  {
    path: "/registration",
    element: <Registration />,
    errorElement: <Info />,
  },
];

const policy_route_group = [
  {
    path: "/policy",
    element: <Policy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
];

const service_route_group = [
  {
    path: "/info/:message",
    element: <Info />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter([
  ...policy_route_group,
  ...service_route_group,
  ...security_route_group,
  ...albums_route_group_protected,
]);

export default router;
