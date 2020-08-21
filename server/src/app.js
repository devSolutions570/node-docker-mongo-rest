'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
const app = new express();
// register JSON parser middlewear
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const options = {
    autoIndex: false,
    reconnectTries: 30,
    reconnectInterval: 500,
    poolSize: 10,
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};
const connectWithRetry = () => {
    console.log('MongoDB connection with retry');
    mongoose_1.default.connect("mongodb://localhost:27017/nutrition", options).then(() => {
        console.log('MongoDB is connected');
    }).catch(() => {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
        setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();
const nutritionRouter = require('./routes/nutritionRoutes');
const versionRouter = require('./routes/versionRoutes');
app.use('/', nutritionRouter);
app.use('/', versionRouter);
app.get('/ping', (req, res) => {
    res.send('pongpong........!');
});
app.listen(3000, () => {
    /* eslint-disable */
    console.log("Server is up!");
});
exports.default = app;
//# sourceMappingURL=app.js.map