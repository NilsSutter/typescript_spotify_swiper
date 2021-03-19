import { Response } from "express"
import { Success, Failure } from "../../usecases/useCase"

export const respondWith = (result: Success | Failure, res: Response) => {
  if(result instanceof Success) {
    res.json({working: result.value})
  }

  if(result instanceof Failure) {
    res.json({error: result.failureReason})
  }
}