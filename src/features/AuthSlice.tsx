import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginTypes } from "../types/TYPES";

const initialState: LoginTypes = {
    email: "",
    password: "",
    token: ""
};

const AuthSlice = createSlice({
    name: "LoginAuth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginTypes>) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.email = "";
            state.password = "";
        },
    },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
