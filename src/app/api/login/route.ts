import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersPath = path.join(process.cwd(), "users.json");

export async function GET() {
  return NextResponse.json({ status: "Login API is active", methods: ["POST"] });
}

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();
    
    if (!identifier || !password) {
      return NextResponse.json({ message: "შეიყვანეთ მონაცემები" }, { status: 400 });
    }

    const input = identifier.trim().toLowerCase();
    const phoneInput = identifier.replace(/\D/g, "");

    if (!fs.existsSync(usersPath)) {
      return NextResponse.json({ message: "მომხმარებელი ვერ მოიძებნა" }, { status: 401 });
    }

    const users = JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]");
    const user = users.find((u: any) => 
      (u.gmail === input || u.number === phoneInput) && u.password === password
    );

    if (!user) {
      return NextResponse.json({ message: "მონაცემები არასწორია" }, { status: 401 });
    }

    const { password: _, ...safeUser } = user;
    return NextResponse.json({ success: true, user: safeUser });
  } catch (e) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}