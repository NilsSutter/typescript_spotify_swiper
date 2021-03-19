import app from "./app"

// Application entry
const port: string = process.env.PORT || '8080';
app.set('port', port);

if (app.listen(port)) {
  console.log(`App running on port ${port}`)
}
