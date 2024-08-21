import Mysql from "../../app/MysqlApp";
class ApiComponent {
    
    index(req:any, res:any, next:any):void {
        const options = {
            select:"name, id",
            table:"users",
            // where:"id = 1"
            orderBy:'id ASC'
        }
        try {
            Mysql.select(options, async(response:any) => {
                res.json(response)
                console.log('result : ', response);
            })
        }catch(e:any){
            res.json({"ERROR: ": e})
        }
        
    }

    test(req:any, res:any){
        res.send('test router')
    }

    id(req:any, res:any){
        console.log(req.query);
        let result = {id: req.params.id, name: req.query.name}     
        res.json(result)
    }

}

export default ApiComponent