import { base_url } from "@/utils/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const JobApi = createApi({
  reducerPath: "JobApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["Job"], // ✅ declare tag types

  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (body) => ({
        url: `/job/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Job"], 
    }),

     allJob: builder.query({
      query: (email) => `/job/`,
      providesTags: ["Job"], 
    }),

    myJob: builder.query({
      query: (email) => `/job/my-job/${email}`,
      providesTags: ["Job"], 
    }),

    deleteJob: builder.mutation({
      query: (id) => ({
        url: `job/deleteJob/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"], 
    }),
  }),
});

export const {
  useCreateJobMutation,
  useMyJobQuery,
  useDeleteJobMutation,
  useAllJobQuery
} = JobApi;
