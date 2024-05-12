import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface LogInSlice {
  flag: boolean;
}

const initialState: LogInSlice = {
  flag: false,
};

export const registerSlice = createSlice({
  name: "flagRegister",
  initialState,
  reducers: {
    setOpenRegister: (state, action: PayloadAction<boolean>) => {
      state.flag = action.payload;
    },
  },
});

export const { setOpenRegister } = registerSlice.actions;
export default registerSlice.reducer;