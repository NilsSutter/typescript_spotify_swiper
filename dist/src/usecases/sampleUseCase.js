"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleUseCase = void 0;
const base_1 = require("./base");
class SampleUseCase extends base_1.Base {
    perform() {
        return this.failure("Sample error");
    }
}
exports.SampleUseCase = SampleUseCase;
