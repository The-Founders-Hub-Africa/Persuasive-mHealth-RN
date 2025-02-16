import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseUrl = 'http://127.0.0.1:8000'
//export const baseUrl = 'https://343a-102-88-71-212.ngrok-free.app'

export const mediAppApi = createApi({
  reducerPath: 'mediAppApi',
  baseQuery: fetchBaseQuery({ baseUrl,
      prepareHeaders(headers) {
          if (!headers.get("Content-Type")) {
            headers.set("Content-Type", "application/json")
        }
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
                url: `/logout`,
                headers: { "Authorization": `Token ${token}` },
                method: "POST",
            }),
        }),

        // 

        // getOTP: builder.mutation({
        //     query: token =>({
        //         url: `/otp`,
        //         headers: { "Authorization": `Token ${token}` },
        //         method: "POST",
        //     }),
        // }), 
        OTP: builder.mutation({
            query: data => ({
                url: `/otp`,
                headers: { "Authorization": `Token ${data.token}` },
                method: "POST",
                body: data,
            }),
        }),
        
        // editUser: builder.mutation({
        //     query: data => ({
        //         url: `/edituser`,
        //         headers: {
        //             "Content-Type": "multipart/form-data; boundary=---->",
        //             "Authorization": `Token ${data.token}`,},
        //         method: "POST",
        //         body: data.data,
        //         formData:true 
        //     }),
        // }),
  }),
})

export const {
    useLoginMutation, useRegisterMPUserMutation,
    useLogoutMutation,useOTPMutation
    
    } = mediAppApi
              
