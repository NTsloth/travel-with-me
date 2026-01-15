import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createClient } from "@vercel/kv";

const filePath = path.join(process.cwd(), "users.json");

const kv = createClient({
  url: process.env.STORAGE_REST_API_URL!,
  token: process.env.STORAGE_REST_API_TOKEN!,
});

const getUsers = async () => {
  if (process.env.NODE_ENV === "production") {
    return (await kv.get("users")) || [];
  } else {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data || "[]");
  }
};

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();
    const users = await getUsers();

    if (!identifier || !password) {
      return NextResponse.json({ message: "შეავსეთ ყველა ველი" }, { status: 400 });
    }

    const cleanId = identifier.trim().toLowerCase();

    const user = users.find((u: any) => 
      (u.gmail.toLowerCase() === cleanId || u.number === identifier) && 
      u.password === password
    );

    if (!user) {
      return NextResponse.json({ message: "მონაცემები არასწორია" }, { status: 401 });
    }

    const { password: _, ...safeUser } = user;
    return NextResponse.json({ success: true, user: safeUser }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "სერვერის შეცდომა" }, { status: 500 });
  }
}