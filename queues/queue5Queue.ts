import { queue } from "../configs/queue";

export const queue5Queue = (worker:number = 1) => {
    
    queue.process("queue5", worker, (job:any, done:any) => {
        // handel work hear
        console.log("queue5 data job => ", job.id);
        done();
        
    }); 
}