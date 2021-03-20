import app from "./app"
import mongoose from "mongoose"

// Application entry
const port: string = process.env.PORT || '8080';
app.set('port', port);

// connect to database
mongoose.connect('mongodb://127.0.0.1:27017/spotify_swipes', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Successfully connected to the database")

  if (app.listen(port)) {
    console.log(`App running on port ${port}`)
  }
});
