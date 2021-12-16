import { createSlice } from "@reduxjs/toolkit"

const initialDialogState = {
    modalToggle:false,
    modalTitle: null,
    modalAlertToggle:false,
    modalAlertTitle: null
}

const dialogSlice = createSlice({
    name:'dialog',
    initialState: initialDialogState,
    reducers: {
        modalToggle(state) {
            state.modalToggle = !state.modalToggle;
        },
        modalTitle(state, action) {
            state.modalTitle = action.payload
        },
        modalAlertToggle(state){
            state.modalAlertToggle = !state.modalAlertToggle
        },
        modalAlertTitle(state, action){
            state.modalAlertToggle = action.payload
        }
    }
})

export const dialogActions = dialogSlice.actions;

export default dialogSlice.reducer;