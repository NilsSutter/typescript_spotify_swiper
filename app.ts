import express from "express"
import { sampleRoute } from "./api/routes/sampleRoute"
import { Failure, Success, Base } from "./api/usecases/base"

const app: express.Application = express()

// register middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Dependencies
class SampleUseCase extends Base {
  perform(): Success | Failure {
    return this.failure("Sample error")
  }
}

const sampleUseCase = new SampleUseCase

// v0 routes
app.get("/v0/sample", sampleRoute(sampleUseCase))

export default app
