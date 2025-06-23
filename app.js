const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// In-memory data
let vehicles = [];
let id = 1;

// Routes

// Home - List all vehicles
app.get('/', (req, res) => {
  res.render('index', { vehicles });
});

// Form to add vehicle
app.get('/add', (req, res) => {
  res.render('form', { vehicle: null });
});

// Handle form submission (Create)
app.post('/add', (req, res) => {
  const { vehicleName, price, image, desc, brand } = req.body;
  const newVehicle = { id: id++, vehicleName, price, image, desc, brand };
  vehicles.push(newVehicle);
  res.redirect('/');
});

// Edit vehicle form
app.get('/edit/:id', (req, res) => {
  const vehicle = vehicles.find(v => v.id == req.params.id);
  if (!vehicle) return res.status(404).send('Not Found');
  res.render('form', { vehicle });
});

// Update vehicle
app.post('/edit/:id', (req, res) => {
  const vehicle = vehicles.find(v => v.id == req.params.id);
  if (!vehicle) return res.status(404).send('Not Found');

  const { vehicleName, price, image, desc, brand } = req.body;
  Object.assign(vehicle, { vehicleName, price, image, desc, brand });
  res.redirect('/');
});

// Delete vehicle
app.post('/delete/:id', (req, res) => {
  vehicles = vehicles.filter(v => v.id != req.params.id);
  res.redirect('/');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});