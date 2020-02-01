const express = require('express');
const database = require('../database/index.js');

const app = express();
app.use(express.static('./client/dist'));

app.get('/', (req, res) => res.status(200).send('ROOT'));

app.get('/api/reservations/:restaurantId/dateTime/:dateTime', (req, res) => {
  database.getReservations(req.params.restaurantId, req.params.dateTime);
  res.status(200).send('DATETIMES');
});
module.exports = app;
