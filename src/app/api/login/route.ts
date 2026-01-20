import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const sessionsPath = path.join(process.cwd(), "active_sessions.json");
const usersPath = path.join(process.cwd(), "users.json");

const getSessions = (): any[] => {
  if (!fs.existsSync(sessionsPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(sessionsPath, "utf8") || "[]");
  } catch {
    return [];
  }
};

export async function GET() {
  const sessions = getSessions();
  return NextResponse.json(sessions);
}

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();
    
    let users: any[] = [];
    if (fs.existsSync(usersPath)) {
      users = JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]");
    }

    const user = users.find((u: any) => 
      (u.gmail === identifier || u.number === identifier) && u.password === password
    );

    if (!user) return NextResponse.json({ message: "არასწორია" }, { status: 401 });

    const { password: _, ...safeUser } = user;
    let sessions = getSessions();

    if (!sessions.find(s => s.gmail === safeUser.gmail)) {
      sessions.push({ ...safeUser, loginTime: new Date().toLocaleString() });
      fs.writeFileSync(sessionsPath, JSON.stringify(sessions, null, 2));
    }

    return NextResponse.json({ success: true, user: safeUser });
  } catch (e) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}