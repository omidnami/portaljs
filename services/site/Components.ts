import Components from "../../configs/Components"

class ApiComponent extends Components {
    
    index(req:any, res:any, next:any):void {
        
        res.json({"omid": 1})
    }

    test(req:any, res:any){
        res.send('ok')
    }

    id(req:any, res:any){
        console.log(req.query);
        let result = {id: req.params.id, name: req.query.name}     
        res.json(result)
    }

}

export default ApiComponent