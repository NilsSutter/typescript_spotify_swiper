"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondWith = void 0;
const useCase_1 = require("../../usecases/useCase");
const respondWith = (result, res) => {
    if (result instanceof useCase_1.Success) {
        res.json({ working: result.value });
    }
    if (result instanceof useCase_1.Failure) {
        res.json({ error: result.failureReason });
    }
};
exports.respondWith = respondWith;
