import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface LogInSlice {
    flag: boolean;
}

const initialState: LogInSlice = {
    flag: false,
};

export const signInSlice = createSlice({
    name: "flagSignIn",
    initialState,
    reducers: {
        setOpenSignIn: (state, action: PayloadAction<boolean>) => {
            state.flag = action.payload;
        },
    },
});

export const { setOpenSignIn } = signInSlice.actions;
export default signInSlice.reducer;