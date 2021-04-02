"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondWith = void 0;
const base_1 = require("../../usecases/base");
const respondWith = (result, res) => {
    if (result instanceof base_1.Success) {
        res.json({ working: result.value });
    }
    if (result instanceof base_1.Failure) {
        res.json({ error: result.failureReason });
    }
};
exports.respondWith = respondWith;
