import TestController from "../controllers/TestController";


const express = require("express");
export const omidRouter = express.Router();

omidRouter.get("/omid", TestController.index);