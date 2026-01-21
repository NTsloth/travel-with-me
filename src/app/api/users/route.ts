import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "users.json");

const getUsers = (): any[] => {
  try {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
};

export async function GET() {
  try {
    const users = getUsers();
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json({ error: "Failed to load users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const users = getUsers();

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const phoneRegex = /^5\d{8}$/;

    if (!data.gmail || !data.password || !data.number) {
      return NextResponse.json({ message: "შეავსეთ ყველა სავალდებულო ველი" }, { status: 400 });
    }

    const emailInput = data.gmail.trim().toLowerCase();
    const phoneInput = data.number.replace(/\D/g, "");

    if (!emailRegex.test(emailInput)) {
      return NextResponse.json({ message: "ელ-ფოსტის ფორმატი არასწორია" }, { status: 400 });
    }

    if (!phoneRegex.test(phoneInput)) {
      return NextResponse.json({ message: "ნომერი უნდა იყოს 9 ნიშნა (5XXXXXXXX)" }, { status: 400 });
    }

    if (users.some((u: any) => u.gmail === emailInput)) {
      return NextResponse.json({ message: "ეს ელ-ფოსტა უკვე დაკავებულია" }, { status: 400 });
    }

    if (users.some((u: any) => u.number === phoneInput)) {
      return NextResponse.json({ message: "ეს ნომერი უკვე დაკავებულია" }, { status: 400 });
    }

    const newUser = { 
      ...data, 
      gmail: emailInput, 
      number: phoneInput,
      id: Date.now() 
    };
    
    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}