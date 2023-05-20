import { configureStore } from '@reduxjs/toolkit';

import userReducer from "./space-blog/slices/UserSlice";

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store

