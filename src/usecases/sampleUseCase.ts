import { Base, Success, Failure } from "./base";

export class SampleUseCase extends Base {
  perform(): Success | Failure {
    return this.failure("Sample error")
  }
}