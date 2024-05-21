import { Job, QueueEvents } from "bullmq";
import connection from "../connection";

import { useWorker as worker } from "../worker";

worker.on("completed", (job: Job) => {
  console.log("completed with data:", job.data);
});

worker.on("progress", (job: Job) => {
  console.log("In Progess", job.id);
});

worker.on("failed", (job: Job | undefined, error: Error) => {
  if (job) {
    console.log("job failed", job.failedReason);
  } else {
    console.log("job failed", error.message);
  }
});

const queueEvents = new QueueEvents("worker1", {
  connection: connection.duplicate(),
});

export const useGlobalEvents = () => {
  queueEvents.on(
    "completed",
    (args: {
      jobId: string;
      returnvalue: string;
      prev?: string | undefined;
    }) => {
      console.log("finished", args.jobId);
    }
  );

  queueEvents.on(
    "failed",
    (
      args: { jobId: string; failedReason: string; prev?: string },
      id: string
    ) => {
      console.error(
        "job",
        args.jobId,
        "with id",
        id,
        "error",
        args.failedReason
      );
    }
  );

  queueEvents.on("waiting", (jobId, err) => {
    console.error("job", jobId, "error", err);
  });
};
