import { UseCaseResult } from "../lib/types/useCaseResult"

export class Success {
  value: any

  constructor(value: any) {
    this.value = value
  }
}

export class Failure {
  failureReason: any

  constructor(failureReason: any) {
    this.failureReason = failureReason
  }
}

export abstract class Base {
  abstract perform(...args: any[]): UseCaseResult

  success(value: any): Success  {
    return new Success(value)
  }

  failure(reason: string): Failure {
    return new Failure(reason)
  }
}
