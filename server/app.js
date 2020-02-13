const cors = require('cors');
const path = require('path');
const express = require('express');
const database = require('../database/index.js');

const app = express();
app.use(express.static('./client/dist'));
app.use(express.json());
app.use(cors());


app.get('/?id=:restaurantId', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


// /api/module_name/:id

// api/restaurants/5/dateTime/3

// http://localhost:4444/api/reservations/4/dateTime/Wed%20Feb%2012%202020%2019%3A22%3A21%20GMT-0800%20(Pacific%20Standard%20Time)

app.get('/api/reservations/:')

app.get('/api/reservations/:restaurantId/dateTime/:dateTime', (req, res) => {
  database.getReservations(
    req.params.restaurantId,
    req.params.dateTime,
    (err, result) => {
      res.json(result);
    },
  );
});




module.exports = app;
