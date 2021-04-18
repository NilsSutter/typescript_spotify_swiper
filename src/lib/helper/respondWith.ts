import { Response } from "express"
import { Success, Failure } from "../../usecases/base"
import { UseCaseResult } from "../types/useCaseResult"

export const respondWith = (result: UseCaseResult, res: Response) => {
  if(result instanceof Success) {
    res.json({working: result.value})
  }

  if(result instanceof Failure) {
    res.json({error: result.failureReason})
  }
}