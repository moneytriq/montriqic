

import { Worker } from "bullmq";
import { connection } from "../lib/redis.js";
import { sendWelcomeEmail } from "../actions/email.js";

const worker = new Worker(
  "email-queue",
  async (job) => {

    if (job.name === "welcome-email") {
      const { email } = job.data;
      await sendWelcomeEmail(email);
    }
  },
  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("error", (err) => {
  console.error("Worker error:", err);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed`, err);
});

