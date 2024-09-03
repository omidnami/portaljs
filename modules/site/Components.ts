import { createQueue } from "../../configs/queue";
import Users from "../../models/UsersModel";
class ApiComponent {
    
   async index(req:any, res:any, next:any) {
        const users = await Users.select('name, emaile, id').orderBy({id:"ASC"}).get()


        res.json(users)
    }

    test(req:any, res:any) {
        createQueue({name:'test',data:null})        
        res.send('test router')
    }

    async id(req:any, res:any){  


            const emailOption = {   
                from: "info@omid-nami.ir",
                to: "info@omid-nami.ir",
                subject: "hello test",
                text: "hello world",
                html: "<h1>dear omid nami</h1>"+
                "<p>good!</p>"
            }
            
            createQueue({name:'email',data:emailOption});
            
            
        res.json('mail send')
    }

}

export default ApiComponent