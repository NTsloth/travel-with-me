import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "users.json");

const getUsersFromFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
    return [];
  }
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data || "[]");
};

export async function GET() {
  const users = getUsersFromFile();
  const safeUsers = users.map(({ password, ...user }: any) => user);
  return NextResponse.json({ 
    status: "Registration API is active",
    count: users.length,
    registeredUsers: safeUsers 
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const users = getUsersFromFile();

    if (!data.gmail || !data.number || !data.driverName || !data.password || !data.birthYear) {
      return NextResponse.json({ message: "შეავსეთ ყველა ველი" }, { status: 400 });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
    if (!passwordRegex.test(data.password)) {
      return NextResponse.json({ 
        message: "პაროლი უნდა შეიცავდეს მინიმუმ 9 სიმბოლოს, დიდ და პატარა ასოს, ციფრს და სიმბოლოს (@$!%*?&)" 
      }, { status: 400 });
    }

    if (!/^5\d{8}$/.test(data.number)) {
      return NextResponse.json({ message: "გამოიყენეთ ქართული ნომერი (5________)" }, { status: 400 });
    }

    const age = new Date().getFullYear() - parseInt(data.birthYear);
    if (age < 18) {
      return NextResponse.json({ message: "რეგისტრაციისთვის უნდა იყოთ 18+ წლის" }, { status: 400 });
    }

    const emailInput = data.gmail.trim().toLowerCase();

    if (users.some((u: any) => u.gmail === emailInput || u.number === data.number)) {
      return NextResponse.json({ message: "მონაცემები უკვე გამოყენებულია" }, { status: 400 });
    }

    const newUser = { 
      gmail: emailInput, 
      driverName: data.driverName, 
      number: data.number, 
      driverAge: age, 
      password: data.password 
    };

    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: "Success", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "სერვერის შეცდომა" }, { status: 500 });
  }
}