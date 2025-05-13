import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => headers,
    // prepareHeaders: (headers, { getState }) => {
    //   console.log(getState());
    //   const token = getState().auth.user.refreshToken;
    //   console.log(token);

    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/users", //if there is a error the set query in call back function and method in object
      method: "GET",
    }),
  }),
});

export const { useGetUserQuery } = userApi;
