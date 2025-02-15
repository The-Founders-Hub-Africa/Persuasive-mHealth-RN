import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
// const baseUrl = 'http://127.0.0.1:8000'
const baseUrl = 'https://3dc5-102-89-46-207.ngrok-free.app'

export const mediAppApi = createApi({
  reducerPath: 'mediAppApi',
  baseQuery: fetchBaseQuery({ baseUrl,
    prepareHeaders(headers){
        headers.set("Content-Type", "application/json")
        return headers
    }
  }),
  
  tagTypes: ['userlogin'],
    endpoints: (builder) => ({

        login: builder.mutation({
            query: data => ({
                url: "/login",
                method: "POST",
                body: data
            }),
            // transformResponse : (response,meta,arg) => response.data,
            // transformErrorResponse : response => response.status,
            invalidatesTags: ['userlogin']
        }),

        registerMPUser: builder.mutation({
            query: data => ({
                url: "/registermp",
                method: "POST",
                body: data
            }),
            // transformResponse : (response,meta,arg) => response.data,
            // transformErrorResponse : response => response.status,
            invalidatesTags: ['userlogin']
        }),

        logout: builder.mutation({
            query: token => ({
                url: `/api/logout`,
                headers: { "Authorization": `Token ${token}` },
                method: "POST",
            }),
        }),

        getOTP: builder.mutation({
            query: token =>({
                url: `/otp`,
                headers: { "Authorization": `Token ${token}` },
                method: "GET",
            }),
        }), 
        verifyOTP: builder.mutation({
            query: data => ({
                url: `/otp`,
                headers: { "Authorization": `Token ${data.token}` },
                method: "POST",
                body: data,
            }),
        }),

  }),
})

export const {
    useLoginMutation, useRegisterMPUserMutation,
    useLogoutMutation,
    useGetOTPMutation,useVerifyOTPMutation,
    
    } = mediAppApi
              
