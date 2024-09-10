import { queue } from "../configs/queue";

export const queue3Queue = (worker:number = 1) => {
    
    queue.process("queue3", worker, (job:any, done:any) => {
        // handel work hear
        console.log("queue3 data job => ", job.id);
        done();
        
    }); 
}