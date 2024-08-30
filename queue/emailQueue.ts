import { SendMail } from "../configs/email";
import { queue } from "../configs/queue";

export const emailQueue = (name:string, worker:number = 1) => {
    
    queue.process(name, worker, (job:any, done:any) => {
        console.log(name,' data job => ', job.id);

        SendMail(job.data, (res:boolean, error?:any) => {
            if (res === true)
                //handle success
                console.log('email is sent');
            else
                //handle error
                console.log('Error : ', error);
                
            
    })

        
        done();
        
    }); 




}