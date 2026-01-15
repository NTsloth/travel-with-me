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

export async function fetchTravelData(params: any) {
  const query = new URLSearchParams(params).toString();
  try {
    const res = await fetch(`/api/travel?${query}`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Server error");
    return await res.json();
  } catch (e) {
    console.error("Fetch failed");
    return [];
  }
}

export async function addTravelRoute(data: any) {
  try {
    const res = await fetch("/api/travel", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}