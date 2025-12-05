import { base_url } from "@/utils/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const JobApi = createApi({
  reducerPath: "JobApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["Job"],

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
      query: () => `/job/`,
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

    myJobOverview: builder.mutation({
      query: (data) => ({
        url: `/overview/client`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
    singleJob: builder.query({
      query: (id) => `/job/${id}`,
    }),
    updateJob: builder.mutation({
      query: (data) => ({
        url: "/job",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
    allPoster:builder.query({
      query:()=>`/allJobPoster`
    }),
    posterOverview:builder.query({
      query:() => '/allJobPoster/overview'
    })

  }),
});

export const {
  useCreateJobMutation,
  useMyJobQuery,
  useDeleteJobMutation,
  useAllJobQuery,
  useMyJobOverviewMutation,
  useSingleJobQuery,
  useUpdateJobMutation,
  useAllPosterQuery,
  usePosterOverviewQuery
} = JobApi;
