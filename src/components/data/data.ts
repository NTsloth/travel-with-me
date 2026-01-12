export interface TravelRoute {
  id: number;
  fromCity: string;
  toCity: string;
  date: string; 
  price: string;
  carModel: string;
  driverName: string;
  driverAge: number;
  driverPhone: string;
  freeSeats: number;
}

export const GEORGIAN_CITIES = ["თბილისი", "ბათუმი", "ქუთაისი", "რუსთავი", "გორი", "ზუგდიდი", "ფოთი", "თელავი", "მცხეთა", "ბორჯომი"];

const API_BASE = "http://127.0.0.1:5001/api/travel";

export async function fetchTravelData(params: any) {
  const query = new URLSearchParams(params).toString();
  try {
    const res = await fetch(`${API_BASE}?${query}`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Server error");
    return await res.json();
  } catch (e) {
    console.error("Connection to backend failed!");
    return [];
  }
}

export async function addTravelRoute(data: any) {
  try {
    const res = await fetch("http://127.0.0.1:5001/api/travel", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (e) {
    console.error("Connection failed", e);
    return false;
  }
}