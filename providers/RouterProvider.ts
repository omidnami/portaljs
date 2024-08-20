import Provider from "./Provider"
import { Router } from "../modules/site"
import { RouterDivar } from "../modules/divar"

class RouterProvider extends Provider  {

    constructor(parameters:any) {
        super()
    }

    static routerUse(app:any) {
        app.use("/", Router)
        app.use("/", RouterDivar)
    }
}
export default RouterProvider