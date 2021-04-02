import { Request, Response, NextFunction } from "express";

export type ExpressRouteFunc = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;
