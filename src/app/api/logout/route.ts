// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";
// import { createClient } from "@vercel/kv";

// const kv = (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
//   ? createClient({
//       url: process.env.KV_REST_API_URL,
//       token: process.env.KV_REST_API_TOKEN,
//     })
//   : null;

// export async function GET() {
//   if (kv) {
//     await kv.set("active_sessions", []);
//   } else {
//     const sessionsPath = path.join(process.cwd(), "active_sessions.json");
//     fs.writeFileSync(sessionsPath, JSON.stringify([]));
//   }
//   return NextResponse.json({ message: "Logged out all" });
// }