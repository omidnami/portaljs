import kue from "kue"
import { emailQueue } from "../queues/emailQueue";
import { testQueue } from "../queues/testQueue";
import { name2Queue } from "../queues/name2Queue";
import { queue4Queue } from "../queues/queue4Queue";
import { queue3Queue } from "../queues/queue3Queue";
import { queue5Queue } from "../queues/queue5Queue";
import redisConfig from "./redis-connection";
// Import Queue End

export const queue = kue.createQueue(redisConfig);

export const createQueue = (opt:{name:string , data:any, priority?:string|number, attempts?:number, delay?:number}) => {
    // prioryty = low: 10 normal: 0 medium: -5 high: -10 critical: -15

    const job = queue.create(opt.name, opt.data)
    .delay(opt.delay??0) // milisocunds
    .priority(opt.priority??0) // prioryty = low: 10 normal: 0 medium: -5 high: -10 critical: -15
    .attempts(opt.attempts??1) // repeat again filed queue
    .ttl(30000)
    .save((error:any) => {
        if (error) {
            console.error('Error queue => ', error);
        } else {
            console.log(`${opt.name} job added to queue: ${opt.name} ${job.id}`);
        }
  } )

}

export const processQueue = () => {
    name2Queue();
    queue4Queue();

    queue3Queue();

    queue5Queue();

        emailQueue()
        testQueue()
        // Queue End
}