import { Request, Response, NextFunction } from "express";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import mongoose from "mongoose";
import Hotel from "../infrastructure/schemas/Hotel";

export const retrieveByQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.query;

    if (!query || query.length === 0) {
      const hotels = (await Hotel.find({})).map((hotel) => {
        return {
          hotel: hotel,
          confidence: 1,
        };
      });
      res.status(200).json(hotels);
      return;
    }
    //initating the embeddings model to vectorize the query
    const embeddings = new OpenAIEmbeddings({
      modelName: "text-embedding-3-small",
      apiKey: process.env.OPENAI_API_KEY,
    });

    //initating the vector index to search the query
    const vectorIndex = new MongoDBAtlasVectorSearch(embeddings, {
      collection: mongoose.connection.collection("hotelVectors"),
      indexName: "vector-index",
    });

    //searching the query in the vector index
    const results = await vectorIndex.similaritySearchWithScore(
      query as string
    );

    //returning the results
    const matchedHotels = await Promise.all(
      results.map(async (result) => {
        const hotel = await Hotel.findById(result[0].metadata._id);
        return {
          hotel: hotel,
          confidence: result[1].toFixed(2),
        };
      })
    );

    res
      .status(200)
      .json(
        matchedHotels.length > 3 ? matchedHotels.slice(0, 3) : matchedHotels
      );
    return;
  } catch (error) {
    next(error);
  }
};
