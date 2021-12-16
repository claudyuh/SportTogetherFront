import { createSlice } from "@reduxjs/toolkit"

const initialAuthState = {
    isAuthenticated: false,
    token:null,
    tokenExpiration: null
}

const authSlice = createSlice({
    name:'authentication',
    initialState: initialAuthState,
    reducers: {
        isAuthenticated(state, action) {
            state.isAuthenticated = action.payload
        },
        token(state, action) {
            state.token = action.payload
        },
        tokenExpiration(state, action) {
            state.tokenExpiration = action.payload
        }   
    }
})


export const authActions = authSlice.actions;

export default authSlice.reducer;