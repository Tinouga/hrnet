import {configureStore} from "@reduxjs/toolkit";
import {employeeApi} from "../services/employeeApi";
import employeeReducer from "../features/employeeSlice";

const store = configureStore({
    reducer: {
        [employeeApi.reducerPath]: employeeApi.reducer,
        employee: employeeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(employeeApi.middleware)
});

export default store;

