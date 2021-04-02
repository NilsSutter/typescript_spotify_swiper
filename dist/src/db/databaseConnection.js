"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DatabaseConnection {
    // prevent constuction calls with new operator
    constructor() { }
    // Get access to the singleton instance
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    // connect to database
    establish() {
        mongoose_1.default.connect(this.connectionUrl(), {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return mongoose_1.default.connection;
    }
    connectionUrl() {
        let connectionUrl;
        const isProduction = process.env.NODE_ENV === 'production';
        if (isProduction) {
            connectionUrl = process.env.DB_PROD_URL;
        }
        else {
            connectionUrl = process.env.DB_DEV_URL;
        }
        return connectionUrl;
    }
}
exports.DatabaseConnection = DatabaseConnection;
