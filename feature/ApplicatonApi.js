import { base_url } from "@/utils/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApplicationApi = createApi({
  reducerPath: "ApplicationApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["Application"],
  endpoints: (builder) => ({
    // Apply for a job
    applied: builder.mutation({
      query: (body) => ({
        url: "/applicaton",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Application"],
    }),
    
    // Get all applicants for a specific job
    allApplicant: builder.query({
      query: (id) => ({
        url: `/job/applicant/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) =>
        result
          ? [
              { type: "Application", id },
              ...result.data.map((application) => ({
                type: "Application",
                id: application._id,
              })),
            ]
          : [{ type: "Application", id }],
    }),
    
    // Update application status
    updateApplicationStatus: builder.mutation({
      query: (data) => ({
        url: "/applicaton",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { _id, job }) => [
        { type: "Application", id: _id },
        { type: "Application", id: job },
      ],
    }),
    
    // Get single application by ID
    getSingleApplication: builder.query({
      query: (id) => ({
        url: `/applicaton/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Application", id }],
    }),
    
    // Get applications by user
    getMyApplications: builder.query({
      query: () => ({
        url: "/applicaton/my-applications",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((application) => ({
                type: "Application",
                id: application._id,
              })),
              "Application",
            ]
          : ["Application"],
    }),
  }),
});

// Export hooks
export const {
  useAppliedMutation,
  useAllApplicantQuery,
  useUpdateApplicationStatusMutation,
  useGetSingleApplicationQuery,
  useGetMyApplicationsQuery,
} = ApplicationApi;