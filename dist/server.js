"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const databaseConnection_1 = require("./src/db/databaseConnection");
// Application entry
const port = process.env.PORT || '8080';
app_1.default.set('port', port);
const db = databaseConnection_1.DatabaseConnection.getInstance().establish();
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Successfully connected to the database");
    // start server
    if (app_1.default.listen(port)) {
        console.log(`App running on port ${port}`);
    }
});
