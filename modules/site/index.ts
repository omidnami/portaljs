import ApiComponent from "./Components"

const express = require("express")

// Creating express Router
export const Router = express.Router()

const component = new ApiComponent
// Handling routs
Router.get("/", component.index)
Router.get("/api/1", component.test)
Router.get("/api/:id", component.id)
