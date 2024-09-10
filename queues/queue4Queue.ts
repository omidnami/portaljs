import { queue } from "../configs/queue";

export const queue4Queue = (worker:number = 1) => {
    
    queue.process("queue4", worker, (job:any, done:any) => {
        // handel work hear
        console.log("queue4 data job => ", job.id);
        done();
        
    }); 
}