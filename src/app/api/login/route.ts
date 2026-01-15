import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "users.json");

const getUsersFromFile = () => {
  try {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return [];
  }
};

export async function GET() {
  const users = getUsersFromFile();
  return NextResponse.json({ 
    message: "Login API is live", 
    totalUsers: users.length, 
    allUsers: users.map((u: any) => ({ 
      name: u.driverName, 
      email: u.gmail, 
      phone: u.number 
    })) 
  });
}

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();
    const users = getUsersFromFile();

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