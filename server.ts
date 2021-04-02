import app from "./app"
import { DatabaseConnection } from "./src/db/databaseConnection";

// Application entry
const port: string = process.env.PORT || '8080';
app.set('port', port);

const db = DatabaseConnection.getInstance().establish()

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Successfully connected to the database")

  // start server
  if (app.listen(port)) {
    console.log(`App running on port ${port}`)
  }
});
