"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
const express = require("express");
// Creating express Router
exports.Crypto = express.Router();
// Handling routs
exports.Crypto.get("/cripto", (req, res, next) => {
    res.send("This is the cripto request");
});
