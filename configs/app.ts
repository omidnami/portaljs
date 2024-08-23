const express = require("express")
import Provider from "../providers/Provider"
import RouterProvider from "../providers/RouterProvider"


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


export default express