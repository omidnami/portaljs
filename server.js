"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RouterProvider_1 = __importDefault(require("./providers/RouterProvider"));
const express = require("express");
require('dotenv').config();
// Creating express server
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
RouterProvider_1.default.routerUse(app);
app.listen((process.env.PORT), () => {
    console.log("Server is Running by : " + process.env.PROJECT_NAME + " port: " + process.env.PORT);
    // console.log('The solution is: ', JSON.stringify(msql));
});
