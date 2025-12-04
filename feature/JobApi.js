import { base_url } from "@/utils/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const JobApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),

  endpoints: (builder) => ({
    // getSingleUser: builder.query({
    //   query: (email) => `/user/getUser/${email}`, 
    // }),
    createJob: builder.mutation({
      query:(body)=>({
        url:`/job/`,
        method:"POST",
        body:body

      })
    })
  }),
});

export const {  useCreateJobMutation } = JobApi;
