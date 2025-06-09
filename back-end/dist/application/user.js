"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const User_1 = __importDefault(require("../infrastructure/schemas/User"));
const createUser = async (req, res) => {
    const newUser = req.body;
    if (!newUser.name || !newUser.email) {
        res.status(400).send("Please provide all the required fields");
        return;
    }
    await User_1.default.create({
        name: newUser.name,
        email: newUser.email,
    });
    res.status(201).json(newUser);
    return;
};
exports.createUser = createUser;
//# sourceMappingURL=user.js.map