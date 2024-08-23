const Bull = require("bull")
import { Job } from "bull";

import { EmailType } from "../interfaces/emailInter";
// import redisConnection from "./redis-connection"
import { SendMail } from "./email";

const EmailQueue = new Bull('email',  {  
    redis: "localhost:6379",
})

// email queue
export const SendNewEmail = async (email: EmailType) => {
    EmailQueue.add({ ...email });
};
// email jobs
const ProcessEmailQueue = async (job: Job) => {
    console.log(job);

    SendMail(job.data)  
}

// add process queue
export const StartQueue = () => {
    console.log('process');

    EmailQueue.process(ProcessEmailQueue)
}