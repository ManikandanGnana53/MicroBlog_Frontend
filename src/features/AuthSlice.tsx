import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginTypes } from "../types/TYPES";

const initialState: LoginTypes = {
    email: "",
    password: "",
    accessToken: ""
};

const AuthSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginTypes>) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.accessToken = action.payload.accessToken;
        },
        logout: (state) => {
            state.email = "";
            state.password = "";
        },
    },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
