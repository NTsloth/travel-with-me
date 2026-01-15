import { NextResponse } from "next/server";
import { createClient } from "@vercel/kv";
import fs from "fs";
import path from "path";

const kv = (
    (process.env.STORAGE_REST_API_URL || process.env.KV_REST_API_URL) && 
    (process.env.STORAGE_REST_API_TOKEN || process.env.KV_REST_API_TOKEN)
  )
    ? createClient({
        url: process.env.STORAGE_REST_API_URL || process.env.KV_REST_API_URL || "",
        token: process.env.STORAGE_REST_API_TOKEN || process.env.KV_REST_API_TOKEN || "",
      })
    : null;

export async function GET() {
  try {
    if (kv) {
      await kv.set("active_sessions", []);
    } else {
      const sessionsPath = path.join(process.cwd(), "active_sessions.json");
      if (fs.existsSync(sessionsPath)) {
        fs.writeFileSync(sessionsPath, JSON.stringify([]));
      }
    }
    return NextResponse.json({ success: true, message: "Logged out all" });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}