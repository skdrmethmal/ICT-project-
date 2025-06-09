"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveByQuery = void 0;
const openai_1 = require("@langchain/openai");
const mongodb_1 = require("@langchain/mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Hotel_1 = __importDefault(require("../infrastructure/schemas/Hotel"));
const retrieveByQuery = async (req, res, next) => {
    try {
        const { query } = req.query;
        if (!query || query.length === 0) {
            const hotels = (await Hotel_1.default.find({})).map((hotel) => {
                return {
                    hotel: hotel,
                    confidence: 1,
                };
            });
            res.status(200).json(hotels);
            return;
        }
        //initating the embeddings model to vectorize the query
        const embeddings = new openai_1.OpenAIEmbeddings({
            modelName: "text-embedding-3-small",
            apiKey: process.env.OPENAI_API_KEY,
        });
        //initating the vector index to search the query
        const vectorIndex = new mongodb_1.MongoDBAtlasVectorSearch(embeddings, {
            collection: mongoose_1.default.connection.collection("hotelVectors"),
            indexName: "vector-index",
        });
        //searching the query in the vector index
        const results = await vectorIndex.similaritySearchWithScore(query);
        const threshold = 0.7;
        const filteredResults = results.filter(([doc, score]) => score > threshold);
        //returning the results
        const matchedHotels = await Promise.all(filteredResults.map(async (result) => {
            const hotel = await Hotel_1.default.findById(result[0].metadata._id);
            return {
                hotel: hotel,
                confidence: result[1].toFixed(2),
            };
        }));
        res
            .status(200)
            .json(matchedHotels.length > 3 ? matchedHotels.slice(0, 3) : matchedHotels);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.retrieveByQuery = retrieveByQuery;
//# sourceMappingURL=retrieve.js.map