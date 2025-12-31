// import { sendWelcomeEmail } from "@/actions/email.js";

import { sendWelcomeEmail } from "@/actions/email";

export async function POST() {
  
    await sendWelcomeEmail("udemezueanthony9@gmail.com");
  return Response.json({
    success: true,
    message: "Test email job added to queue",
  });
}

// import { emailQueue } from "../../../lib/queues/emailQueue.js";
// export async function POST() {
//   await emailQueue.add("welcome-email", {
//     email: "",
//   });
  
//   return Response.json({
//     success: true,
//     message: "Test email job added to queue",
//   });
// }



