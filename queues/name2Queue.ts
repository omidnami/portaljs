import { queue } from "../configs/queue";

export const name2Queue = (worker:number = 1) => {
    
    queue.process("name2", worker, (job:any, done:any) => {
        // handel work hear
        console.log("name2 data job => ", job.id);
        done();
        
    }); 
}