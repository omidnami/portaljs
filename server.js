"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./configs/app");
app_1.App.listen((process.env.PORT), () => {
    console.log("Server is Running by : " + process.env.PROJECT_NAME + " port: " + process.env.PORT);
    // console.log('The solution is: ', JSON.stringify(msql));
});
