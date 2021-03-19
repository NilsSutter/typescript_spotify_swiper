import { Request, Response } from "express";
import { respondWith } from "../lib/helper/respondWith";
import { ExpressRouteFunc } from "../lib/types/expressRouteFunc";
import { Base as UseCase } from "../usecases/base";

// To be able to use a Dependency Injection approach, all route functions must return a type of ExpressRouteFunc.
// General express route callbacks only expect 3 arguments, req, res and next, 
	// e.g. app.get('/some_route', (req, res, next) => {...}), so no dependency can be passed here.
// To be able to pass any dependency, the ExpressRouteFunc will be wrapped in another function, so that they can 
// dynamically pass in any dependency in app.ts and easier mock them out in the routes unit tests.
export const sampleRoute = (useCase: UseCase): ExpressRouteFunc => {
	return async (_req: Request, res: Response) => {
		respondWith(useCase.perform(), res)
	}
}
