const express = require("express")
import RouterProvider from "../providers/RouterProvider"


export const App = express()
RouterProvider.routerUse(App)

require('dotenv').config()

const bodyParser = require('body-parser')

App.use(bodyParser.json())

App.use(bodyParser.urlencoded({ extended: true }))


export default express