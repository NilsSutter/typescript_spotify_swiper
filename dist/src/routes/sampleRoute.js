"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleRoute = void 0;
const respondWith_1 = require("../lib/helper/respondWith");
// To be able to use a Dependency Injection approach, all route functions must return a type of ExpressRouteFunc.
// General express route callbacks only expect 3 arguments, req, res and next, 
// e.g. app.get('/some_route', (req, res, next) => {...}), so no dependency can be passed here.
// To be able to pass any dependency, the ExpressRouteFunc will be wrapped in another function, so that they can 
// dynamically pass in any dependency in app.ts and easier mock them out in the routes unit tests.
const sampleRoute = (useCase) => {
    return async (_req, res) => {
        respondWith_1.respondWith(useCase.perform(), res);
    };
};
exports.sampleRoute = sampleRoute;
