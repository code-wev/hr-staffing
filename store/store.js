import { JobApi } from "@/feature/JobApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{

        [JobApi.reducerPath]:JobApi.reducer
        
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat([

            JobApi.middleware
        ])
})