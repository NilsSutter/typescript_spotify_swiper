import express from "express"
import { sampleRoute } from "./api/routes/sampleRoute"
import { SampleUseCase } from "./api/usecases/sampleUseCase"

const app: express.Application = express()

// register middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Dependencies
const sampleUseCase = new SampleUseCase

// v0 routes
app.get("/v0/sample", sampleRoute(sampleUseCase))

export default app
