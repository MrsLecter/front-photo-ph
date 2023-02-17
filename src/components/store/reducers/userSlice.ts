import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { TWENTY_FOUR_HOURS_IN_MS } from "@const";

const initialState = {
  accessToken: "",
  refreshToken: "",
  isLoggedIn: false,
  expiresIn: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    enroll(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiresIn = new Date().getTime() + TWENTY_FOUR_HOURS_IN_MS;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.accessToken = "";
      state.refreshToken = "";
      state.expiresIn = 0;
    },
  },
});

export default userSlice.reducer;
