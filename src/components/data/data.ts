export const GEORGIAN_CITIES = [
  "თბილისი",
  "ბათუმი",
  "ქუთაისი",
  "რუსთავი",
  "გორი",
  "ზუგდიდი",
  "ფოთი",
  "თელავი",
  "მცხეთა",
  "ბორჯომი",
];

export interface TravelSearchState {
  fromCity: string;
  toCity: string;
  travelDate: string;
}

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

let mockRoutes: TravelRoute[] = [
  {
    id: 1,
    fromCity: "თბილისი",
    toCity: "ბათუმი",
    date: new Date().toISOString().split("T")[0],
    price: "50 GEL",
    carModel: "Toyota Prius (2018)",
    driverName: "გიორგი დვალი",
    driverAge: 35,
    driverPhone: "555 123 456",
    freeSeats: 3,
  },
  {
    id: 2,
    fromCity: "ქუთაისი",
    toCity: "თბილისი",
    date: new Date().toISOString().split("T")[0],
    price: "75 GEL",
    carModel: "Mercedes-Benz E-Class",
    driverName: "ნინო ბერიძე",
    driverAge: 28,
    driverPhone: "599 987 654",
    freeSeats: 1,
  },
  {
    id: 3,
    fromCity: "თბილისი",
    toCity: "თელავი",
    date: new Date().toISOString().split("T")[0],
    price: "120 GEL",
    carModel: "Hyundai Elantra",
    driverName: "დავით კაპანაძე",
    driverAge: 44,
    driverPhone: "577 000 111",
    freeSeats: 4,
  },
];

export const initialSearchState: TravelSearchState = {
  fromCity: GEORGIAN_CITIES[0] || "",
  toCity: GEORGIAN_CITIES[1] || "",
  travelDate: new Date().toISOString().split("T")[0],
};

export async function fetchTravelData(
  searchParams: TravelSearchState
): Promise<TravelRoute[]> {
  console.log("სამგზავრო ძებნა:", searchParams);

  const filteredRoutes = mockRoutes.filter(
    (route) =>
      route.fromCity === searchParams.fromCity &&
      route.toCity === searchParams.toCity &&
      route.date === searchParams.travelDate
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(filteredRoutes);
    }, 500);
  });
}

export async function addTravelRoute(newRouteData: Omit<TravelRoute, "id">) {
  const newId =
    mockRoutes.length > 0 ? Math.max(...mockRoutes.map((r) => r.id)) + 1 : 1;
  const newRoute: TravelRoute = {
    ...newRouteData,
    id: newId,
  };

  mockRoutes.push(newRoute);
  console.log("დამატებულია ახალი მარშრუტი:", newRoute);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 300);
  });
}
