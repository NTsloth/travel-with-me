import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const sessionsPath = path.join(process.cwd(), "active_sessions.json");
    fs.writeFileSync(sessionsPath, JSON.stringify([]));
    return NextResponse.json({ success: true, message: "Logged out all" });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}