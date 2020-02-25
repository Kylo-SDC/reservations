// require('newrelic');
const cors = require('cors');
const path = require('path');
const express = require('express');
const db = require('../database/postGres.js');
// const db = require('../database/index.js');
const app = express();


app.use(express.static('./client/dist'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.get('/?id=:restaurantId', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/api/reservations/:restaurantId/dateTime/:dateTime', (req, res) => {
  db.getReservations(
    req.params.restaurantId,
    Number(req.params.dateTime),
    (err, results) => {
      if (err) {
        console.log('err getting restaurantids & datetimes', err);
        res.status(400).json(err);
      }
      // console.log(result);
      res.status(200).json(results);
    },
  );
});

app.get('/api/reservations/:restaurantId', (req, res) => {
  // console.log(req.params);
  db.getRestaurantId(req.params.restaurantId, (err, results) => {
    if (err) {
      console.log('error getting restaurantId!', err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/api/reservations/', (req, res) => {
  db.postReservation(req.body.id, req.body.restaurantId, req.body.dateTime, (err, results) => {
    console.log(req.body);
    if (err) {
      console.log('error posting reservation', err);
    } else {
      res.status(201).json(results);
    }
  });
});

app.put('/api/reservations/:id', (req, res) => {
  db.updateReservation(req.body.dateTime, req.params.id, (err, results) => {
    if (err) {
      console.log('error updating reservation');
    } else {
      res.status(201).json(results);
    }
  });
});

app.delete('/api/reservations/:id', (req, res) => {
  db.deleteReservation(req.params.id, (err, results) => {
    if (err) {
      console.log('error deleting reservation', err);
    } else {
      res.status(200).json(results);
    }
  });
});


module.exports = app;
