import { configureStore } from '@reduxjs/toolkit';

import userReducer from "./space-blog/slices/UserSlice";
import updateSlice from "./space-blog/slices/UpdateSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        update: updateSlice
    }
})

export default store

