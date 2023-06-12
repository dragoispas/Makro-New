import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DayEntry, FoodEntry, Product, ProductType, ProductWithUsage, User } from "./types";
import { providesList } from "./api-helpers";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["User", "DayEntry", "FoodEntry", "Product", "ProductWithUsage"],
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
      invalidatesTags: (result) => (result ? ["User"] : []),
    }),
    logout: builder.mutation<void, void>({
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
      invalidatesTags: (result) => (result ? ["User"] : []),
    }),

    /** DAY ENTRIES **/
    dayEntryByDate: builder.query<DayEntry, string>({
      query: (date: string) => `/day-entry/date/${date}`,
      providesTags: (result) => [{ type: "DayEntry", id: result?.id }],
    }),
    updateDayEntry: builder.mutation<DayEntry, { id: number; data: Partial<DayEntry> }>({
      query: ({ id, data }) => ({
        url: `/day-entry/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (dayEntry) => (dayEntry ? [{ type: "DayEntry", id: dayEntry.id }] : []),
    }),

    /** FOOD ENTRIES **/
    foodEntry: builder.query<FoodEntry, number>({
      query: (id: number) => `/food-entry/${id}`,
      providesTags: (result) => [{ type: "FoodEntry", id: result?.id }],
    }),
    createFoodEntry: builder.mutation<FoodEntry, Omit<FoodEntry, "id" | "product">>({
      query: (createData) => ({
        url: `/food-entry`,
        method: "POST",
        body: createData,
      }),
      invalidatesTags: (foodEntry) =>
        foodEntry ? [{ type: "DayEntry", id: foodEntry.dayEntryId }] : [],
    }),
    updateFoodEntry: builder.mutation<FoodEntry, { id: number; data: Partial<FoodEntry> }>({
      query: ({ id, data }) => ({
        url: `/food-entry/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (foodEntry) => (foodEntry ? [{ type: "FoodEntry", id: foodEntry.id }] : []),
    }),
    removeFoodEntry: builder.mutation<boolean, { id: number; dayEntryId: number }>({
      query: ({ id }) => ({
        url: `/food-entry/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (wasRemoved, error, { dayEntryId }) =>
        wasRemoved ? [{ type: "DayEntry", id: dayEntryId }] : [],
    }),

    /** PRODUCTS **/
    searchProductsByUsage: builder.query<
      ProductWithUsage[],
      { searchTerm?: string; type?: ProductType }
    >({
      query: ({ searchTerm, type }) => {
        const params = new URLSearchParams({
          ...(searchTerm && searchTerm.length > 0 && { term: searchTerm }),
          ...(type && { type }),
        });
        return `/food-entry/by-product/search?${params.toString()}`;
      },
      providesTags: (result) => providesList(result, "ProductWithUsage"),
    }),
    product: builder.query<Product, number>({
      query: (id: number) => `/product/${id}`,
      providesTags: (result) => [{ type: "Product", id: result?.id }],
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (createData) => ({
        url: `/product`,
        method: "POST",
        body: createData,
      }),
    }),
    updateProduct: builder.mutation<Product, { id: number; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (product) => (product ? [{ type: "Product", id: product.id }] : []),
    }),
    removeProduct: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (wasRemoved, error, id) => (wasRemoved ? [{ type: "Product", id }] : []),
    }),
  }),
});

export const {
  useUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useDayEntryByDateQuery,
  useUpdateDayEntryMutation,
  useFoodEntryQuery,
  useCreateFoodEntryMutation,
  useUpdateFoodEntryMutation,
  useRemoveFoodEntryMutation,
  useSearchProductsByUsageQuery,
  useProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
} = api;
