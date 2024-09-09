const express = require("express");
export const api4Router = express.Router();

api4Router.get("/api4", (req: any, res: any) => {
   res.json("hello api4 router");
});