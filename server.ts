import { App } from "./configs/app"
import { StartQueue } from "./configs/queue"


App.listen((process.env.PORT),()=>{
    StartQueue()
    console.log("Server is Running by : "+ process.env.PROJECT_NAME +" port: "+process.env.PORT)
    // console.log('The solution is: ', JSON.stringify(msql));
})