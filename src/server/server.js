const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const today = new Date().toISOString().split("T")[0];

let users = [];
let mockRoutes = [
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

app.post('/api/register', (req, res) => {
  const data = req.body;
  const emailInput = data.gmail ? data.gmail.trim().toLowerCase() : "";
  const phoneInput = data.number ? data.number.trim() : "";
  const nameInput = data.driverName ? data.driverName.trim() : "";

  if (!emailInput || !phoneInput || !nameInput || !data.password || !data.birthYear) {
    return res.status(400).json({ message: "გთხოვთ შეავსოთ ყველა ველი" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const geoPhoneRegex = /^5\d{8}$/;

  if (!emailRegex.test(emailInput)) {
    return res.status(400).json({ message: "ელ-ფოსტის ფორმატი არასწორია" });
  }
  if (!geoPhoneRegex.test(phoneInput)) {
    return res.status(400).json({ message: "ნომერი უნდა იყოს 9 ციფრი და იწყებოდეს 5-ით" });
  }

  const age = new Date().getFullYear() - parseInt(data.birthYear);
  if (age < 18) {
    return res.status(400).json({ message: "რეგისტრაციისთვის საჭიროა იყოთ 18+ წლის" });
  }

  const alreadyExists = users.some(u => u.gmail === emailInput || u.number === phoneInput);
  if (alreadyExists) {
    return res.status(400).json({ message: "მომხმარებელი უკვე არსებობს" });
  }

  const newUser = { gmail: emailInput, driverName: nameInput, number: phoneInput, driverAge: age, password: data.password };
  users.push(newUser);
  res.status(201).json({ message: "Success", user: newUser });
});

app.get('/api/travel', (req, res) => {
  const { fromCity, toCity, travelDate } = req.query;
  let filtered = [...mockRoutes];
  if (fromCity) filtered = filtered.filter(r => r.fromCity === fromCity);
  if (toCity) filtered = filtered.filter(r => r.toCity === toCity);
  if (travelDate) filtered = filtered.filter(r => r.date === travelDate);
  res.json(filtered);
});

app.post('/api/travel', (req, res) => {
  const newRoute = {
    id: Date.now(),
    fromCity: req.body.fromCity,
    toCity: req.body.toCity,
    date: req.body.date,
    price: req.body.price,
    carModel: req.body.carModel,
    driverName: req.body.driverName,
    driverAge: req.body.driverAge,
    driverPhone: req.body.driverPhone,
    freeSeats: parseInt(req.body.freeSeats) || 1
  };
  mockRoutes.unshift(newRoute);
  res.status(201).json({ success: true, route: newRoute });
});

app.listen(5001, '0.0.0.0', () => {
  console.log(`SERVER RUNNING ON PORT 5001`);
});