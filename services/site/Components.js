"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Components_1 = __importDefault(require("../../configs/Components"));
class ApiComponent extends Components_1.default {
    index(req, res, next) {
        res.json({ "omid": 1 });
    }
    test(req, res) {
        res.send('ok');
    }
    id(req, res) {
        console.log(req.query);
        let result = { id: req.params.id, name: req.query.name };
        res.json(result);
    }
}
exports.default = ApiComponent;
