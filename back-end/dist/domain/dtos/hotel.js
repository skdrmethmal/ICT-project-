"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHotelDTO = void 0;
const zod_1 = require("zod");
exports.addHotelDTO = zod_1.z.object({
    name: zod_1.z.string(),
    location: zod_1.z.string(),
    image: zod_1.z.string(),
    price: zod_1.z.number(),
    description: zod_1.z.string(),
    propertyType: zod_1.z.string(),
});
//# sourceMappingURL=hotel.js.map