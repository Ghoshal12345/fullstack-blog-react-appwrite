import { configureStore } from "@reduxjs/toolkit";
import functions from "./authSlice.js";

const store= configureStore({
    reducer:{
        auth: functions,
    }
});

export default store