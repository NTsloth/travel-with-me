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

const getUsers = async () => {
  if (kv && process.env.NODE_ENV === "production") {
    try {
      return (await kv.get("users")) || [];
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
  if (kv && process.env.NODE_ENV === "production") {
    await kv.set("users", users);
  } else {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  }
};

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const users: any[] = await getUsers();

    if (!data.gmail || !data.number || !data.driverName || !data.password || !data.birthYear) {
      return NextResponse.json({ message: "შეავსეთ ყველა ველი" }, { status: 400 });
    }

    const emailInput = data.gmail.trim().toLowerCase();
    if (users.some((u: any) => u.gmail === emailInput || u.number === data.number)) {
      return NextResponse.json({ message: "მონაცემები უკვე გამოყენებულია" }, { status: 400 });
    }

    const age = new Date().getFullYear() - parseInt(data.birthYear);
    const newUser = { ...data, gmail: emailInput, driverAge: age };
    
    users.push(newUser);
    await saveUsers(users);

    return NextResponse.json({ message: "Success", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "სერვერის შეცდომა" }, { status: 500 });
  }
}