import { App } from "./configs/app"

App.listen((process.env.PORT),()=>{
    console.log("Server is Running by : "+ process.env.PROJECT_NAME +" port: "+process.env.PORT)
    // console.log('The solution is: ', JSON.stringify(msql));
})