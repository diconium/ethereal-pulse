import { Queue, Worker, QueueEvents, Job } from "bullmq";

const myQueue = new Queue("Paint");

async function addJobs() {
  await myQueue.add("myJobName", { foo: "bar" });
  await myQueue.add("myJobName", { qux: "baz" });
}

async function addMultipleJobs() {
  await addJobs();
}

addMultipleJobs();

const worker = new Worker("Paint", async (job: Job) => {
  // Will print { foo: 'bar'} for the first job
  // and { qux: 'baz' } for the second.
  console.log(job.data);
});

worker.on("completed", (job: Job, returnvalue: any) => {
  console.log(`Job ${job.id} completed with return value:`, returnvalue);
});

worker.on("progress", (job: Job, progress: number | object) => {
  console.log(`Job ${job.id} in progress with data:`, progress);
});

worker.on("failed", (job: Job | undefined, error: Error) => {
  if (job) {
    console.log(`Job ${job.id} failed with reason:`, error.message);
  } else {
    console.log(`A job failed with reason:`, error.message);
  }
});

interface IActive {
  jobId: string;
  prev?: string;
}

const queueEvents = new QueueEvents("Paint");

queueEvents.on("waiting", ({ jobId }) => {
  console.log(`A job with ID ${jobId} is waiting`);
});

queueEvents.on("active", ({ jobId, prev }: IActive) => {
  console.log(`Job ${jobId} is now active; previous status was ${prev}`);
});

queueEvents.on("progress", ({ jobId, data }, timestamp) => {
  console.log(`Job ${jobId} reported progress ${data} at ${timestamp}`);
});

queueEvents.on("completed", ({ jobId, returnvalue }) => {
  console.log(`Job ${jobId} has completed and returned ${returnvalue}`);
});

queueEvents.on("failed", ({ jobId, failedReason }) => {
  console.log(`Job ${jobId} has failed with reason ${failedReason}`);
});
