"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestError extends Error {
    constructor(message) {
        super(message);
        this.name = "TestError";
    }
}
exports.default = TestError;
//# sourceMappingURL=test-error.js.map