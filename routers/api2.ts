const express = require("express");
export const api2Router = express.Router();

api2Router.get("/api2", (req: any, res: any) => {
   res.json("hello api2 router");
});