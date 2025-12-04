import { ApplicationApi } from "@/feature/ApplicatonApi";
import { JobApi } from "@/feature/JobApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{

        [JobApi.reducerPath]:JobApi.reducer,
        [ApplicationApi.reducerPath]:ApplicationApi.reducer
        
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat([

            JobApi.middleware,
            ApplicationApi.middleware

        ])
})