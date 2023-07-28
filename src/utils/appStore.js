import { configureStore } from "@reduxjs/toolkit";
import lawyerReducer from "./lawyerSlice";


const appStore = configureStore({
    reducer: {
        lawyer: lawyerReducer
    }
});

export default appStore;