import { NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

const today = new Date().toISOString().split("T")[0];

const mockRoutes = [
  { id: 1, fromCity: "თბილისი", toCity: "ბათუმი", date: today, price: "20 GEL", carModel: "Toyota Prius (2018)", driverName: "გიორგი დვალი", driverAge: 35, driverPhone: "555 123 456", freeSeats: 3 },
  { id: 2, fromCity: "ქუთაისი", toCity: "თბილისი", date: today, price: "15 GEL", carModel: "Mercedes-Benz E-Class", driverName: "ნინო ბერიძე", driverAge: 28, driverPhone: "599 987 654", freeSeats: 1 },
  { id: 3, fromCity: "თბილისი", toCity: "თელავი", date: today, price: "10 GEL", carModel: "Hyundai Elantra", driverName: "დავით კაპანაძე", driverAge: 44, driverPhone: "577 000 111", freeSeats: 4 },
  { id: 4, fromCity: "თბილისი", toCity: "რუსთავი", date: today, price: "20 GEL", carModel: "Nissan Leaf", driverName: "ლაშა ჩხეიძე", driverAge: 30, driverPhone: "579 112 233", freeSeats: 2 },
  { id: 5, fromCity: "ბათუმი", toCity: "ქუთაისი", date: today, price: "5 GEL", carModel: "Ford Transit (Minivan)", driverName: "მარიამ აბულაძე", driverAge: 52, driverPhone: "558 765 432", freeSeats: 7 },
  { id: 6, fromCity: "ზუგდიდი", toCity: "თბილისი", date: today, price: "10 GEL", carModel: "BMW 5 Series", driverName: "სანდრო ჯანაშია", driverAge: 41, driverPhone: "551 098 765", freeSeats: 3 },
  { id: 7, fromCity: "თელავი", toCity: "თბილისი", date: today, price: "40 GEL", carModel: "Mitsubishi Outlander", driverName: "თამარ ლომიძე", driverAge: 33, driverPhone: "593 222 333", freeSeats: 4 },
  { id: 8, fromCity: "თბილისი", toCity: "ფოთი", date: today, price: "20 GEL", carModel: "Renault Logan", driverName: "ირაკლი კობახიძე", driverAge: 48, driverPhone: "555 444 333", freeSeats: 2 },
  { id: 9, fromCity: "ბათუმი", toCity: "თბილისი", date: today, price: "55 GEL", carModel: "Tesla Model 3", driverName: "ანა დოიჯაშვილი", driverAge: 25, driverPhone: "599 555 666", freeSeats: 3 },
  { id: 10, fromCity: "გორი", toCity: "თბილისი", date: today, price: "20 GEL", carModel: "VAZ 2107", driverName: "მამუკა გელაშვილი", driverAge: 55, driverPhone: "570 100 200", freeSeats: 4 },
  { id: 11, fromCity: "თბილისი", toCity: "ქუთაისი", date: today, price: "15 GEL", carModel: "Toyota Aqua", driverName: "ქეთი ლომიძე", driverAge: 31, driverPhone: "555 999 888", freeSeats: 2 },
];

const kv = (process.env.STORAGE_REST_API_URL && process.env.STORAGE_REST_API_TOKEN) 
  ? createClient({ url: process.env.STORAGE_REST_API_URL, token: process.env.STORAGE_REST_API_TOKEN }) 
  : null;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fromCity = searchParams.get("fromCity");
  const toCity = searchParams.get("toCity");

  let dbRoutes: any[] = mockRoutes;
  
  if (kv) {
    const saved = await kv.get("travel_routes");
    if (saved) dbRoutes = saved as any[];
  }

  let filtered = [...dbRoutes];
  if (fromCity) filtered = filtered.filter(r => r.fromCity === fromCity);
  if (toCity) filtered = filtered.filter(r => r.toCity === toCity);

  return NextResponse.json(filtered);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let dbRoutes: any[] = mockRoutes;

    if (kv) {
      const saved = await kv.get("travel_routes");
      if (saved) dbRoutes = saved as any[];
    }
    
    const newRoute = {
      id: Date.now(),
      ...body,
      price: body.price.includes("GEL") ? body.price : `${body.price} GEL`
    };

    dbRoutes.unshift(newRoute);
    if (kv) await kv.set("travel_routes", dbRoutes);
    
    return NextResponse.json({ success: true, route: newRoute }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "შეცდომა" }, { status: 500 });
  }
}