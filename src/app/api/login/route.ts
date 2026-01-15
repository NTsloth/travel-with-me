import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createClient } from "@vercel/kv";

const sessionsPath = path.join(process.cwd(), "active_sessions.json");
const usersPath = path.join(process.cwd(), "users.json");

const kv = (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
  ? createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  : null;

const getSessions = async (): Promise<any[]> => {
  if (kv) {
    return (await kv.get("active_sessions") as any[]) || [];
  } else {
    if (!fs.existsSync(sessionsPath)) return [];
    return JSON.parse(fs.readFileSync(sessionsPath, "utf8") || "[]");
  }
};

export async function GET() {
  const sessions = await getSessions();
  return NextResponse.json(sessions);
}

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();
    
    // იუზერების წამოღება
    let users: any[] = [];
    if (kv) {
      users = (await kv.get("users") as any[]) || [];
    } else if (fs.existsSync(usersPath)) {
      users = JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]");
    }

    const user = users.find((u: any) => 
      (u.gmail === identifier || u.number === identifier) && u.password === password
    );

    if (!user) return NextResponse.json({ message: "არასწორია" }, { status: 401 });

    const { password: _, ...safeUser } = user;

    // სესიის შენახვა
    let sessions = await getSessions();
    if (!sessions.find(s => s.gmail === safeUser.gmail)) {
      sessions.push({ ...safeUser, loginTime: new Date().toLocaleString() });
      if (kv) await kv.set("active_sessions", sessions);
      else fs.writeFileSync(sessionsPath, JSON.stringify(sessions, null, 2));
    }

    return NextResponse.json({ success: true, user: safeUser });
  } catch (e) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}