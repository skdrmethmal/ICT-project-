import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
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
    generateChat: builder.mutation({
      query: (messages) => ({
        url: "/generate",
        method: "POST",
        body: { messages },
      }),
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useCreateBookingMutation,
  useGenerateChatMutation,
  useGetHotelBySearchQuery,
  useGetBookingsByUserQuery,
} = api;
export { api };
