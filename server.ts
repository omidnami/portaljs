import RouterProvider from "./providers/RouterProvider"

const express=require("express")
require('dotenv').config()

// Creating express server
const app=express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
RouterProvider.routerUse(app)

app.listen((process.env.PORT),()=>{
    console.log("Server is Running by : "+ process.env.PROJECT_NAME +" port: "+process.env.PORT)
    // console.log('The solution is: ', JSON.stringify(msql));

})