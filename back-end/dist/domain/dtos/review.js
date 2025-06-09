"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createreviewDTO = void 0;
const zod_1 = require("zod");
exports.createreviewDTO = zod_1.z.object({
    hotelId: zod_1.z.string(),
    rating: zod_1.z.number(),
    review: zod_1.z.string(),
});
//# sourceMappingURL=review.js.map