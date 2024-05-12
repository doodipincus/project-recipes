import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "./sliceSignIn";
import registerReducer from "./sliceRegister";

export const store = configureStore({
    reducer: {
        register: registerReducer,
        sigIn: signInReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;