import { queue } from "../configs/queue";

export const testQueue = (name:string, worker:number = 1) => {
    
    queue.process(name, worker, (job:any, done:any) => {

        console.log(name,' data job => ', job.id);
        done();
        
    }); 




}