import Hotel from "../infrastructure/schemas/Hotel";
import { Request, Response, NextFunction } from "express";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { addHotelDTO } from "../domain/dtos/hotel";
import { OpenAI } from "openai";
import { createEmbedding } from "./embeddings";
import stripe from "../infrastructure/stripe";
import { parse } from "path";
import { log } from "console";

//Handler functions for hotels - business logic

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//one time run functions

// const updateExistingHotels = async () => {
//   try {
//     const hotels = await Hotel.find({ stripePriceId: { $exists: false } });
//     hotels.forEach(async (hotel) => {
//       if (!hotel.stripePriceId) {
//         const stripeProduct = await stripe.products.create({
//           name: hotel.name,
//           description: hotel.description,
//           default_price_data: {
//             unit_amount: hotel.price * 100,
//             currency: "usd",
//           },
//         });
//         hotel.stripePriceId = stripeProduct.default_price as string;
//         await hotel.save();
//         console.log("Updated hotels with Stripe price IDs");
//       }
//     });
//   } catch (error) {
//     console.error("Error updating hotels:", error);
//   }
// };
// updateExistingHotels();

// const updateExistingHotelsWithEmail = async () => {
//   try {
//     const hotels = await Hotel.find({});
//     hotels.forEach(async (hotel) => {
//       if (!hotel.hotelEmail) {
//         hotel.hotelEmail = "methmald1222@gmail.com";
//         await hotel.save();
//         console.log("Updated hotels with email");
//       }
//     });
//   } catch (error) {
//     console.error("Error updating hotels with email:", error);
//   }
// };

// updateExistingHotelsWithEmail();

// const updateExistingHotelsWithRating = async () => {
//   try {
//     const hotels = await Hotel.find({});
//     hotels.forEach(async (hotel) => {
//       if (!hotel.rating && !hotel.reviews && !hotel.totalRating) {
//         hotel.rating = 0;
//         hotel.reviews = 0;
//         hotel.totalRating = 0;
//         await hotel.save();
//         console.log("Updated hotels with rating");
//       }
//     });
//   } catch (error) {
//     console.error("Error updating hotels with rating:", error);
//   }
// };

export const getAllHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotels = await Hotel.find();
    if (!hotels) {
      throw new NotFoundError("Hotels not found");
    }

    res.status(200).json(hotels);
    return;
  } catch (error) {
    next(error);
  }
};

export const getHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    res.status(200).json(hotel);
    return;
  } catch (error) {
    next(error);
  }
};

export const addHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newHotel = addHotelDTO.safeParse(req.body);
    console.log(req.body);
    if (!newHotel.success) {
      throw new ValidationError("Hotel data is not valid");
    }
    // if (
    //   !newHotel.name ||
    //   !newHotel.location ||
    //   !newHotel.image ||
    //   !newHotel.price ||
    //   !newHotel.description
    // ) {
    //   throw new ValidationError("Please provide all the required fields");
    // }

    // await Hotel.create({
    //   name: newHotel.name,
    //   location: newHotel.location,
    //   // rating: parseFloat(newHotel.rating),
    //   // reviews: parseInt(newHotel.reviews),
    //   image: newHotel.image,
    //   price: parseInt(newHotel.price),
    //   description: newHotel.description,
    // });

    // creating a stripe product
    const stripeProduct = await stripe.products.create({
      name: newHotel.data.name,
      description: newHotel.data.description,
      default_price_data: {
        unit_amount: newHotel.data.price * 100,
        currency: "usd",
      },
    });

    // creating a hotel with the stripe product id
    const savedHotel = await Hotel.create({
      name: newHotel.data.name,
      location: newHotel.data.location,
      hotelEmail: newHotel.data.hotelEmail,
      // rating: parseFloat(newHotel.data.rating),
      // reviews: parseInt(newHotel.data.reviews),
      image: newHotel.data.image,
      propertyType: newHotel.data.propertyType,
      price: newHotel.data.price,
      description: newHotel.data.description,
      stripePriceId: stripeProduct.default_price as string,
    });

    createEmbedding(savedHotel);

    res.status(201).json(newHotel);
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel to delete not found");
      return;
    }

    if (hotel.stripePriceId) {
      const price = await stripe.prices.retrieve(hotel.stripePriceId);
      const productId =
        typeof price.product === "string" ? price.product : price.product.id;

      try {
        // Attempt to delete the product
        await stripe.products.del(productId);
        console.log(`Stripe product ${productId} deleted successfully.`);
      } catch (stripeError: any) {
        // If deletion fails (e.g., due to active prices), archive the product
        console.warn(
          `Stripe product deletion failed, archiving instead: ${stripeError.message}`
        );
        await stripe.products.update(productId, { active: false });
      }
    } else {
      console.warn("No Stripe price ID associated with this hotel.");
    }
    await Hotel.findByIdAndDelete(hotelId);
    res.status(200).json({
      message: "Hotel deleted successfully",
    });
    return;
  } catch (error) {
    console.error("Error deleting hotel:", error);
    next(error);
  }
};

export const updateHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelId = req.params.id;
    const updateHotel = req.body;
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      throw new NotFoundError("Hotel to update not found");
    }

    if (
      !updateHotel.name ||
      !updateHotel.location ||
      !updateHotel.rating ||
      !updateHotel.reviews ||
      !updateHotel.image ||
      !updateHotel.price ||
      !updateHotel.description
    ) {
      throw new ValidationError("Please provide all the required fields");
    }

    await Hotel.findByIdAndUpdate(hotelId, updateHotel);

    res.status(201).json(hotel);
    return;
  } catch (error) {
    next(error);
  }
};

//Generate example hotels
export const Generate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid messages format." });
      return;
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = {
      role: "system",
      content: `You are HotelziAI, the intelligent assistant for HotelzaAI — an AI-powered hotel booking platform.

Your purpose is to help users find the best staycation experience based on the vibe or feeling they describe. You do **not** rely on database access but act as a friendly guide and support agent throughout the HotelzaAI app.

Follow these instructions carefully:

1. If a user is unsure whether to book a **hotel, hostel, apartment, villa, or cabin**, ask them to describe the kind of experience they want (e.g., romantic, adventurous, budget-friendly, luxury), then recommend one suitable staycation type.

2. If a user wants to make a booking, instruct them to first **choose the staycation type** and *choose the staycation (ex: Montmartre Majesty Hotel)* they wish to book, then click the **"Book Now"** button to proceed.

3. If a user wants to **list their hotel on HotelzaAI**, tell them to visit the **Help Center**, fill out the form there, and include a **valid email address**. An administrator will contact them via Gmail.

4. If a user asks for hotel suggestions, inform them that you cannot access hotel data. Instead, direct them to use the **AI-powered search on the landing page**, which will recommend hotels based on their vibe and preferences.

5. If a user asks about the HotelzaAI app, explain that it’s a new era of hotel booking. Users can find stays based on their **experience and mood**, not just hotel names. The system recommends the best staycation experience using AI.

6. If a user asks about **bookings**:
   - Tell them they will receive a **reminder email one day before check-in**, ensuring they never forget.
   - If they want to **cancel a booking**, explain that only **pending (unpaid)** bookings can be canceled. Once payment is made, cancellation is no longer possible via HotelzaAI and must be handled directly with the hotel.
   - If they ask why past bookings are not visible, explain that our system automatically cleans up overdue bookings **two days after check-in**.

7. If a user asks how to use the app, explain that they must **sign in to book**, **leave a review**, or **rate the app**. Signing in is required for personalized actions and for more details, direct them to the **Help Center page**.

8. If a user asks about **payment confirmation**, tell them:
   - After booking and paying via our payment gateway, they will be redirected to a **confirmation page** showing all booking and payment details.
   - If payment is successful, they will also receive a **confirmation email**.
   - If something goes wrong during payment, the booking will still appear in their **account page**, where they can complete the payment. Assure them that payment security and functionality are reliable and nothing to worry about.

9. If a user asks what happens if they forget to check in, tell them not to worry. A **check-in reminder email** is automatically sent the day before check-in.

10. If a hotel owner asks how they will know about a new booking, explain that whenever a guest books their hotel, they will receive an **instant email notification**.

11. If a user asks about **HotelzaAI's functionalities**, explain:
    - AI-powered hotel search based on experience and mood
    - Simplified booking with a smooth flow
    - Secure payments through **Stripe**
    - 24/7 AI assistant support
    - Email reminders and notifications
    - Personalized user dashboards
    - Secure booking and review management
    - Daily auto-cleaning of old bookings at **2:30 AM**
    - Built-in app ratings and statistics
    - And many more intelligent features to enhance the booking experience

12. If a user asks about **privacy**, reassure them that HotelzaAI takes their privacy seriously. For details, direct them to the **Privacy & Policy** page in the footer.

13. If a user asks about the **tech stack**, respond:
    - **Frontend**: React.js, Redux, RTK Query, Tailwind CSS, ShadCN UI
    - **Backend**: Node.js, Express.js
    - **Database**: MongoDB
    - Together, this is known as the **MERN stack**
    - For more, visit the **About Us page**

14. If a user asks **who developed or owns** the platform, tell them it was **developed and owned by Methmal Deshapriya**.

15. If users ask anything **unrelated to hotel booking, HotelzaAI, or its services**, politely decline and remind them to only ask about relevant topics.

Note: “Directing users” means guiding them to the appropriate page within the app.

Never make up hotel data or accept bookings yourself. Stay helpful, friendly, and focused on providing accurate HotelzaAI-related support.

`,
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [systemPrompt, ...messages],
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "";

    res.status(200).json({
      messages: [...messages, { role: "assistant", content: reply }],
    });
    return;
  } catch (error) {
    console.log("Chatbot error:", error);
    next(error);
  }
};

// const messages = [
//   { role: "user", content: "Hello how are you" },
//   { role: "assistant", content: "Hello I'm good what about you" },
// ];
// const messages2 = [...messages];
// res.status(200).json({
//   message: messages2,
// });
