import { createSlice } from "@reduxjs/toolkit"

const initialAlertState = {
    alertToggle:false,
    alertVariant: null,
    alertTitle: null,
}

const alertSlice = createSlice({
    name:'alert',
    initialState: initialAlertState,
    reducers: {
        alertToggle(state) {
            state.alertToggle = !state.alertToggle;
        },
        alertVariant(state, action) {
            state.alertVariant = action.payload;
        },
        alertTitle(state, action) {
            state.alertTitle = action.payload
        }
    }
})

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;

