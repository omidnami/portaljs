"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const Components_1 = __importDefault(require("./Components"));
const express = require("express");
// Creating express Router
exports.Api = express.Router();
const component = new Components_1.default;
// Handling routs
exports.Api.get("/api", component.index);
exports.Api.get("/api/1", component.test);
exports.Api.get("/api/:id", component.id);
