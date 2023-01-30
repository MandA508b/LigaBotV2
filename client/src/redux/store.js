import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import {apiSlice} from "./apiSlice";
import usersReducer from './users/usersSlice'
import ligasReducer from './ligas/ligasSlice'
import cityReducer from './city/citySlice'
import teamReducer from './teams/teamsSlice'
import advertisementReducer from './advertisement/advertisementSlice'
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        users: usersReducer,
        auth: authReducer,
        ligas: ligasReducer,
        teams:teamReducer,
        city:cityReducer,
        advertisement:advertisementReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    //devTools: true
})