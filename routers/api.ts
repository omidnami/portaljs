const express = require("express");
        export const apiRouter = express.Router();

        apiRouter.get("/api", (req: any, res: any) => {
            res.json("hello api router");
        });
        