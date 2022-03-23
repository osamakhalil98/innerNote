import { createSlice } from "@reduxjs/toolkit";

const initailUserState = { isLoggedIn: false, username: "" };

const userSlice = createSlice({
  name: "user",
  initialState: initailUserState,
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload;
    },

    loggedIn: (state, action) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
