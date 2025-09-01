import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "react-hook-form";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3000/api/",
    baseUrl: `${BACKEND_URL}/api/`,
    prepareHeaders: async (headers) => {
      const token = await window?.Clerk?.session?.getToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => "hotel",
    }),
    getHotelById: builder.query({
      query: (id) => `hotel/${id}`,
    }),
    getHotelBySearch: builder.query({
      query: ({ query }) => `hotel/search/retrieve?query=${query}`,
    }),
    getBookingsByUser: builder.query({
      query: ({ userId }) => `booking/user/${userId}`,
      providesTags: (result, error, { userId }) => [
        { type: "Bookings", id: userId },
      ],
    }),
    getBookingById: builder.query({
      query: (id) => `booking/${id}`,
    }),
    getSessionStatus: builder.query({
      query: (sessionId) => `payment/session-status?sessionId=${sessionId}`,
    }),
    getReviewsByHotelId: builder.query({
      query: ({ hotelId }) => `review/hotel/${hotelId}`,
      providesTags: (result, error, { hotelId }) => [
        { type: "Hotel", id: hotelId },
      ],
    }),
    getReviewsForUser: builder.query({
      query: () => `review/user`,
      providesTags: () => [{ type: "userReviews" }],
    }),

    createHotel: builder.mutation({
      query: (hotel) => ({
        url: "hotel",
        method: "POST",
        body: hotel,
      }),
    }),
    createBooking: builder.mutation({
      query: (booking) => ({
        url: "booking",
        method: "POST",
        body: booking,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Bookings", id: userId },
      ],
    }),
    createReview: builder.mutation({
      query: (review) => ({
        url: "review",
        method: "POST",
        body: review,
      }),
      invalidatesTags: (result, error, { hotelId }) => [
        { type: "Hotel", id: hotelId },
        { type: "userReviews" },
      ],
    }),
    createHelp: builder.mutation({
      query: (help) => ({
        url: "help",
        method: "POST",
        body: help,
      }),
      invalidatesTags: (result, error) => [{ type: "userHelp" }],
    }),

    getHelp: builder.query({
      query: () => `help`,
      providesTags: () => [{ type: "userHelp" }],
    }),

    replyToHelpRequest: builder.mutation({
      query: (data) => ({
        url: `help/reply`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => [{ type: "userHelp" }],
    }),
    getAppStatistics: builder.query({
      query: () => `appstatistics`,
    }),
    checkHasRated: builder.query({
      query: (userId) => `appstatistics/has-rated?userId=${userId}`,
    }),
    createAppRating: builder.mutation({
      query: (data) => ({
        url: `appstatistics`,
        method: "POST",
        body: data,
      }),
    }),
    getLandingReviews: builder.query({
      query: () => `appstatistics/landing-reviews`,
    }),
    ChatBot: builder.mutation({
      query: (messages) => ({
        url: "hotel/generate",
        method: "POST",
        body: messages,
      }),
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useCreateBookingMutation,
  useChatBotMutation,
  useGetHotelBySearchQuery,
  useGetBookingsByUserQuery,
  useGetBookingByIdQuery,
  useGetSessionStatusQuery,
  useCreateReviewMutation,
  useGetReviewsByHotelIdQuery,
  useGetReviewsForUserQuery,
  useCreateHelpMutation,
  useGetHelpQuery,
  useReplyToHelpRequestMutation,
  useGetAppStatisticsQuery,
  useCheckHasRatedQuery,
  useCreateAppRatingMutation,
  useGetLandingReviewsQuery,
} = api;
export { api };
