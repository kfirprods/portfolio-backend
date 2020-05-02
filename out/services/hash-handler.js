"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class HashHandler {
    constructor(hashMethod) {
        this.hashMethod = hashMethod;
    }
    hash(data) {
        return crypto_1.createHash(this.hashMethod).update(data).digest("hex");
    }
}
exports.HashHandler = HashHandler;
//# sourceMappingURL=hash-handler.js.map