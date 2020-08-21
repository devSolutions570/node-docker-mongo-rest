'use strict';
import { Request, Response } from 'express';
const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
import mongoose from "mongoose";
const app = new express();

// register JSON parser middlewear
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  mongoose.connect("mongodb://localhost:27017/nutrition", options).then(()=>{
    console.log('MongoDB is connected')
  }).catch(()=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry()

const nutritionRouter = require('./routes/nutritionRoutes');
const versionRouter = require('./routes/versionRoutes');

app.use('/', nutritionRouter);
app.use('/', versionRouter);

app.get('/ping', (req: Request, res: Response) => {
    res.send('pongpong........!')
})

app.listen(3000, () => {
    /* eslint-disable */
    console.log("Server is up!");
});

export default app;
