import { configureStore } from '@reduxjs/toolkit';
import IsloginSlice from "./IsloginSlice";

export const store = configureStore({
    reducer: {
        IsloginSlice : IsloginSlice.reducer
    }
});
