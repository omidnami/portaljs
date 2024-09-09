const express = require("express");
export const api3Router = express.Router();

api3Router.get("/api3", (req: any, res: any) => {
   res.json("hello api3 router");
});