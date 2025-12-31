import IORedis from "ioredis";

export const connection = new IORedis(
  "redis://default:Ae5YAAIncDE0Yjc2YjA3ZTU5MTY0YTk5ODliOTcxMGM5MGU1MDJlNXAxNjEwMTY@fine-termite-61016.upstash.io:6379",
  {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
     keepAlive: 10000,
  //    retryStrategy: (times) => {
  //   return Math.min(times * 50, 2000);
  // },
  }
);

// export const connection = new IORedis({
//   host: "127.0.0.1",
//   port: 6379,
//   maxRetriesPerRequest: null,
// });
  // retryStrategy: (times) => {
  //   return Math.min(times * 50, 2000);
  // },