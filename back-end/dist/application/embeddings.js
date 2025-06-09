"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmbedding = exports.createEmbeddings = void 0;
const openai_1 = require("@langchain/openai");
const mongodb_1 = require("@langchain/mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Hotel_1 = __importDefault(require("../infrastructure/schemas/Hotel"));
const documents_1 = require("@langchain/core/documents");
//initating the embeddings model to vectorize the query
const embeddingsModel = new openai_1.OpenAIEmbeddings({
    modelName: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
});
//initating the vector index to search the query
const vectorIndex = new mongodb_1.MongoDBAtlasVectorSearch(embeddingsModel, {
    collection: mongoose_1.default.connection.collection("hotelVectors"),
    indexName: "vector-index",
});
//creating the embeddings for the hotels
const createEmbeddings = async (req, res, next) => {
    try {
        const hotels = await Hotel_1.default.find({});
        const docs = hotels.map((hotel) => {
            const { _id, location, price, description } = hotel;
            //   special type for storing embedding text and metadata
            const doc = new documents_1.Document({
                pageContent: `${description} Located in${location}. Price per night ${price} `,
                metadata: {
                    _id,
                },
            });
            return doc;
        });
        await vectorIndex.addDocuments(docs);
        res.status(200).json({ message: "Embeddings created successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.createEmbeddings = createEmbeddings;
//creating the embeddings for the newly added hotel
const createEmbedding = async (hotel) => {
    try {
        const doc = new documents_1.Document({
            pageContent: `${hotel.description} Located in${hotel.location}. Price per night ${hotel.price} `,
            metadata: {
                _id: hotel._id,
            },
        });
        await vectorIndex.addDocuments([doc]);
    }
    catch (error) {
        console.log(error);
    }
};
exports.createEmbedding = createEmbedding;
//# sourceMappingURL=embeddings.js.map