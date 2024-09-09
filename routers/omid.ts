const express = require("express");
export const omidRouter = express.Router();

omidRouter.get("/omid", (req: any, res: any) => {
   res.json("hello omid router");
});