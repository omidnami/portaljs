const express = require("express")
import Provider from "../providers/Provider"
import { processQueue } from "./queue";
const fileUpload = require('express-fileupload');


export const App = express()

require('dotenv').config() 

const bodyParser = require('body-parser')

App.use(bodyParser.json())

App.use(bodyParser.urlencoded({ extended: true }))

App.use( (req: any, res:any, next:any) => {

    const provider = new Provider(req, res, next, App)
    provider.run()
    next();
});

//processQueue()

//upload
App.use(fileUpload({
    useTempFiles: process.env.TEMP_FILES == 'true' ? true : false,
    tempFileDir: process.env.TEMP_DIR
}));


export default express