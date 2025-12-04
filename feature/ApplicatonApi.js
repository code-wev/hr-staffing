import { base_url } from "@/utils/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApplicationApi = createApi({
  reducerPath: "ApplicationApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["application"],
  endpoints: (builder) => ({
    applied: builder.mutation({
      query: (body) => ({
        url: "/applicaton",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

// ✔ Correct hook export
export const { useAppliedMutation } = ApplicationApi;
