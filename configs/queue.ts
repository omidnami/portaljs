import kue from "kue"
import { EmailType } from "../interfaces/emailInter"
import { SendMail } from "./email";
const queue = kue.createQueue({
  prefix: 'q',
  redis: {
    port: 6379,
    host: '127.0.0.1',
    auth: '',
    options: {
      // see https://github.com/mranney/node_redis#rediscreateclient
    }
  }});

export const createQueue = (opt:{name:string , data:any, priority?:string|number, attempts?:number, delay?:number}) => {
    // prioryty = low: 10 normal: 0 medium: -5 high: -10 critical: -15

    const job = queue.create(opt.name, opt.data).delay(opt.delay??0).priority(opt.priority??0).attempts(opt.attempts??1).ttl(30000).save((error:any) => {
        if (error) {
            console.error('Error queue => ', error);
        } else {
            console.log(`Email job added to queue: ${opt.name} ${job.id}`);
        }
  } )

}

  export const processQueue = (name:string, worker:number = 1) => {
    queue.process(name, worker, (job:any, done:any) => {
      console.log(name,' data job => ',job.id);
        SendMail(job.data)
      done();
  });

  // export const queueLog = () {
  //   queue.on()
  // }

}