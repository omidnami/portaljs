import { queue } from "../configs/queue";

export const testQueue = (worker:number = 1) => {
    
    queue.process("test", worker, (job:any, done:any) => {

        console.log("test data job => ", job.id);
        done();
        
    }); 




}