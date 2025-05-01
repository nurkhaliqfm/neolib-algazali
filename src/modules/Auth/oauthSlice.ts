import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OAuthData } from "@/redux/types";

interface AuthState {
  oauthData: OAuthData | null;
}

const initialState: AuthState = {
  oauthData: null,
};

const oauthSlice = createSlice({
  name: "oauth",
  initialState,
  reducers: {
    setOAuthData: (state, action: PayloadAction<OAuthData>) => {
      state.oauthData = action.payload;
    },
    clearOAuthData: (state) => {
      state.oauthData = null;
    },
  },
});

export const { setOAuthData, clearOAuthData } = oauthSlice.actions;
export default oauthSlice.reducer;
