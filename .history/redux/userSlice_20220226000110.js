import {createSlice} from "@reduxjs/toolkit";

const initailUserState = {isLoggedIn: fasle, username:""};

const userSlice = createSlice({
    name:"user",
    initialState:initailUserState,
    reducers :{

    }
});


export const userActions = userSlice.actions;
export default userSlice.reducer;