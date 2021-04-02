"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = exports.Failure = exports.Success = void 0;
class Success {
    constructor(value) {
        this.value = value;
    }
}
exports.Success = Success;
class Failure {
    constructor(failureReason) {
        this.failureReason = failureReason;
    }
}
exports.Failure = Failure;
class Base {
    success(value) {
        return new Success(value);
    }
    failure(reason) {
        return new Failure(reason);
    }
}
exports.Base = Base;
