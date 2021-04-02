import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export class DatabaseConnection {
  private static instance: DatabaseConnection

  // prevent constuction calls with new operator
  private constructor() {}

  // Get access to the singleton instance
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
        DatabaseConnection.instance = new DatabaseConnection();
    }

    return DatabaseConnection.instance;
  }

  // connect to database
  public establish(): mongoose.Connection {
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
