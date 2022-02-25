import {configureStore} from "@reduxjs/toolkit"
import userREducer from "./userSlice";

const store = configureStore({
    reducer : {user: userREducer}
})

export default store;