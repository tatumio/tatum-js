"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TatumError = void 0;
class TatumError extends Error {
    constructor(message, code) {
        super(message);
        this.name = code;
    }
}
exports.TatumError = TatumError;
