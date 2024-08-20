import Components from "../../configs/Components"
import  {Start}   from "../../../services/divar/index.js"
class DivarService extends Components {
    
    configs(data:CONFIGS):INFO {
        //get configs and add data to databas
        return {status: 200, msg: "success"}
    }
    run():INFO {
        // start runging divar service modul for omce of a project
        const data:any = Start()
        //add data to data base "categories, cities, state, area ..."
        return {status: 200, msg: data}
    }

}

export default DivarService