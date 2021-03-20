import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export class DatabaseConnector {
  private static instance: DatabaseConnector

  // prevent constuction calls with new operator
  private constructor() {}

  // Get access to the singleton instance
  public static getInstance(): DatabaseConnector {
    if (!DatabaseConnector.instance) {
        DatabaseConnector.instance = new DatabaseConnector();
    }

    return DatabaseConnector.instance;
  }

  // connect to database
  public execute(): mongoose.Connection {
    mongoose.connect(this.connectionUrl(), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    return mongoose.connection
  }

  private connectionUrl(): string {
    let connectionUrl: string

    const isProduction: boolean = process.env.NODE_ENV === 'production'
  
    if(isProduction) {
      connectionUrl = (process.env.DB_PROD_URL as string)
    } else {
      connectionUrl = (process.env.DB_DEV_URL as string)
    }

    return connectionUrl
  }
}
