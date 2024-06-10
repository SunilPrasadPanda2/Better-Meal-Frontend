import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  mobile: "",
  name: "",
  isAuthenticated: false,
  token: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { _id, mobile, name, isAuthenticated,token,refreshToken } = action.payload;

      state._id = _id;
      state.mobile = mobile;
      state.name = name;
      state.isAuthenticated = isAuthenticated;
      state.token=token;
      state.refreshToken=refreshToken;
    },
    resetAuth: (state, action) => {
      state._id = "";
      state.mobile = "";
      state.name = "";
      state.isAuthenticated = "";
      state.token="";
      state.refreshToken="";
    },
  },
});

export const { setAuth, resetAuth } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectUserType = (state) => state.auth.userType;

export default authSlice.reducer;
