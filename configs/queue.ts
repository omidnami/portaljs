import kue from "kue"
import { EmailType } from "../interfaces/emailInter"
const queue = kue.createQueue();

export const createQueue = (name:string , data:any) => {
    const job = queue.create(name, data).save((error:any) => {
        if (error) {
            console.error('Error queue => ', error);
        } else {
            console.log(`Email job added to queue: ${name} ${data.to}`);
        }
  } )
}

export const processQueue = (name:string) => {
  queue.process(name, (job:any, done:any) => {
    console.log(name,' data job => ',job);
    
    done();
});
}