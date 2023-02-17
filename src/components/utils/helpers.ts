import requestHandler from "@/api/fetch-request-handler";
import { useAppDispatch } from "@hooks/reducers-hooks";
import { userSlice } from "../store/reducers/userSlice";

export const checkTokenRelevance = async ({
  refreshToken,
  expiresIn,
}: {
  refreshToken: string;
  expiresIn: number;
}) => {
  const dispatch = useAppDispatch();
  const { enroll } = userSlice.actions;
  const currentTime = new Date().getTime();
  if (+expiresIn - +currentTime <= 0) {
    try {
      const response: { accessToken: string; refreshToken: string } =
        await requestHandler.makeRefreshRequest({ refreshToken });

      dispatch(
        enroll({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })
      );
    } catch (err: unknown) {
      console.error("Error in checkTokenRelevance: ", err);
    }
  }
};
