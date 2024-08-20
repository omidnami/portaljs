const express=require("express")

// Creating express Router
export const Crypto = express.Router()

// Handling routs
Crypto.get("/cripto",(req:any,res:any,next:any)=>{
  res.send("This is the cripto request")
})