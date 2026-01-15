import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createClient } from "@vercel/kv";

const filePath = path.join(process.cwd(), "users.json");

const kv = (process.env.STORAGE_REST_API_URL && process.env.STORAGE_REST_API_TOKEN)
  ? createClient({
      url: process.env.STORAGE_REST_API_URL,
      token: process.env.STORAGE_REST_API_TOKEN,
    })
  : null;

const getUsers = async (): Promise<any[]> => {
  if (kv) {
    try {
      const data = await kv.get("users");
      return (data as any[]) || [];
    } catch { return []; }
  } else {
    try {
      if (!fs.existsSync(filePath)) return [];
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data || "[]");
    } catch { return []; }
  }
};

const saveUsers = async (users: any[]) => {
  if (kv) {
    await kv.set("users", users);
  } else {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  }
};

export async function GET() {
  const users = await getUsers();
  const safeUsers = users.map(({ password, ...user }: any) => user);
  return NextResponse.json(safeUsers);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const users = await getUsers();

    if (!data.gmail || !data.password || !data.number) {
      return NextResponse.json({ message: "შეავსეთ ველები" }, { status: 400 });
    }

    const emailInput = data.gmail.trim().toLowerCase();
    if (users.some((u: any) => u.gmail === emailInput || u.number === data.number)) {
      return NextResponse.json({ message: "მომხმარებელი უკვე არსებობს" }, { status: 400 });
    }

    const newUser = { ...data, gmail: emailInput, id: Date.now() };
    users.push(newUser);
    await saveUsers(users);

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}