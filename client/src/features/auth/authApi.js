import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://auth-system-7mq5.onrender.com/api/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyEmailOtp: builder.mutation({
      query: (credentials) => ({
        url: "/users/verify-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    resendEmailVerificationOtp: builder.mutation({
      query: (credentials) => ({
        url: "/users/resend-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/signout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useVerifyEmailOtpMutation,
  useResendEmailVerificationOtpMutation,
  useLogoutUserMutation,
} = authApi;
