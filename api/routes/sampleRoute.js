"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleRoute = void 0;
const respondWith_1 = require("../lib/helper/respondWith");
// To be able to use a Dependency Injection approach, all route functions must return a type of ExpressRouteFunc.
// Express route functions only expect 3 arguments, req, res and next, 
// e.g. app.get('/some_route', (req, res, next)), so no dependency can be passed here.
// To be able to pass any dependency, the ExpressRouteFunc will be 
// wrapped in another function, so that they can dynamically pass in any dependency in app.ts and easier mock them out in unit tests.
const sampleRoute = (useCase) => {
    return (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        respondWith_1.respondWith(useCase.perform(), res);
    });
};
exports.sampleRoute = sampleRoute;
