import ApiComponent from "./Components"

const express = require("express")

// Creating express Router
export const Api = express.Router()

const component = new ApiComponent
// Handling routs
Api.get("/api", component.index)
Api.get("/api/1", component.test)
Api.get("/api/:id", component.id)
