"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../configs/database"));
const Error_1 = require("./Error");
const connection = database_1.default.mysqlConection();
class Mysql {
    constructor() {
        this.selectSum = () => { };
        this.selectBetween = (configs, callBack) => {
            const options = {
                where: "salary",
                between: "1000 and 7000"
            };
        };
        this.insert = () => { };
        this.updatet = () => { };
        this.delete = () => { };
    }
}
_a = Mysql;
Mysql.check = () => {
    connection.connect(function (err) {
        if (err) {
            return 'Mysql ERROR to connection. please read log file';
        }
        else {
            return 'Mysql connected';
        }
    });
    // connection.end()
};
Mysql.select = (configs, callBack) => {
    var _b, _c;
    if (process.env.MYSQL_STATUS === 'false') {
        callBack((0, Error_1.ErrorSqlDesible)());
        return false;
    }
    if (!configs.table) {
        callBack("please enter valide table name options = {table: 'TABLE_NAME'}");
        return false;
    }
    const qry = `SELECT ${(_b = configs.select) !== null && _b !== void 0 ? _b : '*'} FROM ${configs.table}  ${configs.where ? 'WHERE ' + configs.where : ''} ORDER BY ${(_c = configs.orderBy) !== null && _c !== void 0 ? _c : 'id DESC'};`;
    connection.connect((err) => {
        if (err)
            throw err;
        console.log("Connected!");
        connection.query(qry, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            callBack(results);
        }));
        connection.end();
    });
    // return res
};
exports.default = Mysql;
