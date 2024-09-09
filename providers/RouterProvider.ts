import { Router } from "../modules/site"
import { RouterDivar } from "../modules/divar"
import { apiRouter } from "../routers/api";
import { omidRouter } from "../routers/omid";
// Router Import End

class RouterProvider  {
    private App:any
    constructor(App:any) {
        this.App = App
    }

    start(req:any, res:any, next:any) {
        console.log('ip => ', req.ip);
        //Enabling CORS
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
        this.router(next)
    }
    
    private router(next:any) {
      this.App.use("/", Router)
      this.App.use("/", apiRouter);
      this.App.use("/", omidRouter);
      this.App.use("/", RouterDivar)
        // Router End
    }

    private socket() {}
}
export default RouterProvider