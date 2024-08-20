"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require('dotenv').config();
const mysql = require('mysql');
const MysqlApp_1 = __importDefault(require("./app/MysqlApp"));
// Importing providers
const ServiceProvider_1 = __importDefault(require("./providers/ServiceProvider"));
// Creating express server
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Handling routes request
// const connection = mysql.createConnection({
//     host     : process.env.MYSQL_HOST || 'localhost',
//     user     : process.env.MYSQL_USER || 'db_user',
//     password : process.env.MYSQL_PASS || '',
//     database : process.env.MYSQL_NAME || 'db_name'
//     });
// connection.query({sql: 'SELECT * FROM `users`'}, function (error:any, results:any, fields:any) {
//     if (error) throw error;
//     res = results[0]
//     console.log('The solution is: ', fields);
//   });
// const check = Mysql.check()
// console.log(check);
const options = {
    select: "name, id",
    table: "users",
    // where:"id = 1"
    orderBy: 'id ASC'
};
MysqlApp_1.default.select(options, (res) => {
    console.log('result : ', res);
});
ServiceProvider_1.default.servicesUse(app);
app.listen((process.env.port), () => {
    console.log("Server is Running by : " + process.env.PROJECT_NAME);
    // console.log('The solution is: ', JSON.stringify(msql));
});
