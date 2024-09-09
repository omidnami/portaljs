const express = require("express")
import ApiComponent from "./Components"
const component = new ApiComponent
export const Router = express.Router()


// Handling routs
Router.get("/", component.index)
// Router.get("/api/1", component.test)
// Router.get("/api/:id", component.id)
