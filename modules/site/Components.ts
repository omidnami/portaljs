import { createQueue, processQueue } from "../../configs/queue";
import User from "../../models/UserModel";

class ApiComponent {
    
   async index(req:any, res:any, next:any) {
        const users = await User.select('name, emaile, id').orderBy({id:"ASC"}).get()


        res.json(users)
    }

    test(req:any, res:any) {
        //processQueue('email')
        res.send('test router')
    }

    async id(req:any, res:any){
        // SendMail({
        //     from: "info@omid-nami.ir",
        //     to: "omid.nami.110@gmail.com",
        //     subject: "hello test",
        //     text: "hello world",
        //     html: "<h1>dear omid nami</h1>"+
        //     "<p>here good!</p>"
        // })    


            const emailOption = {   
                from: "info@omid-nami.ir",
                to: "omid.nami.110@gmail.com",
                subject: "hello test",
                text: "hello world",
                html: "<h1>dear omid nami</h1>"+
                "<p>good!</p>"
            }
            // SendNewEmail(emailOption).then(() => console.log('Job has been added'))
            // .catch(err => console.error('Failed to add job', err)); 
            
              // createQueue({name:'email',data:emailOption});
            
            
        res.json('mail send')
    }

}

export default ApiComponent