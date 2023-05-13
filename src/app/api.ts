import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    /** AUTH **/
    user: builder.query<User, void>({
      query: () => "/auth/profile",
      providesTags: ["User"],
    }),
    login: builder.mutation<User, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
      transformResponse: (response: { user: User }) => response.user,
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<User, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<User, { email: string; password: string; name: string }>({
      query: ({ email, password, name }) => ({
        url: "/auth/register",
        method: "POST",
        body: { email, password, name },
      }),
      transformResponse: (response: { user: User }) => response.user,
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUserQuery,
  useLazyUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = api;
