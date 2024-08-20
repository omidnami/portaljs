import DivarService from "./Divar"

const express = require("express")

// Creating express Router
export const RouterDivar = express.Router()

const divar = new DivarService
// Handling routs
RouterDivar.get("/divar/v1/configs",(res:any, req:any) => {
    res.json(divar.configs(req.params))
})
RouterDivar.get("/divar/v1/run",(res:any) => {
    res.json(divar.run())
})