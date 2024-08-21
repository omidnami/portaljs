"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const RouterProvider_1 = __importDefault(require("../providers/RouterProvider"));
exports.App = express();
RouterProvider_1.default.routerUse(exports.App);
require('dotenv').config();
const bodyParser = require('body-parser');
exports.App.use(bodyParser.json());
exports.App.use(bodyParser.urlencoded({ extended: true }));
exports.default = express;
