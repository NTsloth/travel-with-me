import { NextResponse } from "next/server";
import { mockRoutes } from "@/components/data/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fromCity = searchParams.get("fromCity");
  const toCity = searchParams.get("toCity");
  const travelDate = searchParams.get("travelDate");

  let filtered = [...mockRoutes];
  if (fromCity) filtered = filtered.filter(r => r.fromCity === fromCity);
  if (toCity) filtered = filtered.filter(r => r.toCity === toCity);
  if (travelDate) filtered = filtered.filter(r => r.date === travelDate);

  return NextResponse.json(filtered);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const newRoute = {
      id: Date.now(), 
      fromCity: body.fromCity,
      toCity: body.toCity,
      date: body.date,
      price: body.price.includes("GEL") ? body.price : `${body.price} GEL`,
      carModel: body.carModel,
      driverName: body.driverName,
      driverAge: body.driverAge,
      driverPhone: body.driverPhone,
      freeSeats: parseInt(body.freeSeats) || 1
    };

    mockRoutes.unshift(newRoute);
    
    return NextResponse.json({ success: true, route: newRoute }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "დამატება ვერ მოხერხდა" }, { status: 500 });
  }
}