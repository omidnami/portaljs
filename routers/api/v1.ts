const express = require("express");
export const api/v1Router = express.Router();

api/v1Router.get("/api/v1", (req: any, res: any) => {
   res.json("hello api/v1 router");
});