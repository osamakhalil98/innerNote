import {createSlice} from "@reduxjs/toolkit";

const initailUserState = {isLoggedIn: false, username:""};

const userSlice = createSlice({
    name:"user",
    initialState:initailUserState,
    reducers :{
        getUserName : (state, action) => {
            state.username = action.payload;
        }
    }
});


export const userActions = userSlice.actions;
export default userSlice.reducer;