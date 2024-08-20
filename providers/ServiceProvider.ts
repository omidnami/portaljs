import Provider from "./Provider"
import { Api } from "../services/site"
import { Crypto } from "../services/crypto"

class ServiceProvider extends Provider  {

    constructor(parameters:any) {
        super()
    }

    static servicesUse(app:any) {
        app.use("/", Api)
        app.use("/", Crypto)
    }
}
export default ServiceProvider