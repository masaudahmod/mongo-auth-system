import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://auth-system-7mq5.onrender.com/api/v1",
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
      query: () => "/users",  //if there is a error the set query in call back function and method in object
      method: "GET",
      credentials: "include",
    }),
    verifyToken: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
        credentials: "include",
      })
    })
  }),
});

export const { useGetUserQuery, useVerifyTokenQuery } = userApi;
