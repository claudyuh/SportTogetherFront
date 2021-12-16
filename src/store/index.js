import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth';
import dialogReducer from './modal'
import alertReducer from './alert'

const store = configureStore({
    reducer: { authentication : authReducer, dialog: dialogReducer, alert: alertReducer },
})


export default store;