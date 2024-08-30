import Mysql from "../../app/MysqlApp";
import { SendMail } from "../../configs/email";
import { createQueue } from "../../configs/queue";
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

    test(req:any, res:any) {
        
        res.send('test router')
    }

    async id(req:any, res:any){  


            const emailOption = {   
                from: "info@omid-nami.ir",
                to: "omid.nami.110@gmail.com",
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