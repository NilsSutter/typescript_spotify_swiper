"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sampleRoute_1 = require("./api/routes/sampleRoute");
const useCase_1 = require("./api/usecases/useCase");
const app = express_1.default();
// register middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Dependencies
class SampleUseCase extends useCase_1.UseCase {
    perform() {
        return this.failure("Sample error");
    }
}
const sampleUseCase = new SampleUseCase;
// v0 routes
app.get("/v0/sample", sampleRoute_1.sampleRoute(sampleUseCase));
exports.default = app;
