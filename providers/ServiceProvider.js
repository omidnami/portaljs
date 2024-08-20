"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Provider_1 = __importDefault(require("./Provider"));
const api_1 = require("../services/api");
const crypto_1 = require("../services/crypto");
class ServiceProvider extends Provider_1.default {
    constructor(parameters) {
        super();
    }
    static servicesUse(app) {
        app.use("/", api_1.Api);
        app.use("/", crypto_1.Crypto);
    }
}
exports.default = ServiceProvider;
