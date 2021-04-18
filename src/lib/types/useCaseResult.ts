import { Failure, Success } from "../../usecases/base";

export type UseCaseResult = Promise<Success | Failure> | Success | Failure