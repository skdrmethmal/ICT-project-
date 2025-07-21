import { Request, Response, NextFunction } from "express";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import mongoose from "mongoose";
import Hotel from "../infrastructure/schemas/Hotel";
import { Document } from "@langchain/core/documents";

//initating the embeddings model to vectorize the query
const embeddingsModel = new OpenAIEmbeddings({
  modelName: "text-embedding-3-small",
  apiKey: process.env.OPENAI_API_KEY,
});

//initating the vector index to search the query
const vectorIndex = new MongoDBAtlasVectorSearch(embeddingsModel, {
  collection: mongoose.connection.collection("hotelVectors"),
  indexName: "vector-index",
});

//creating the embeddings for the hotels
export const createEmbeddings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotels = await Hotel.find({});

    const docs = hotels.map((hotel) => {
      const { _id, location, price, description } = hotel;
      //   special type for storing embedding text and metadata
      const doc = new Document({
        pageContent: `${description} Located in${location}. Price per night ${price} `,
        metadata: {
          _id,
        },
      });
      return doc;
    });

    await vectorIndex.addDocuments(docs);
    res.status(200).json({ message: "Embeddings created successfully" });
  } catch (error) {
    next(error);
  }
};

//creating the embeddings for the newly added hotel
export const createEmbedding = async (hotel: any) => {
  try {
    const doc = new Document({
      pageContent: `${hotel.description} Located in${hotel.location}. Price per night ${hotel.price} `,
      metadata: {
        _id: hotel._id,
      },
    });
    await vectorIndex.addDocuments([doc]);
  } catch (error) {
    console.log(error);
  }
};
