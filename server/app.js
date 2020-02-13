const cors = require('cors');
const path = require('path');
const express = require('express');
const db = require('../database/index.js');
const app = express();


app.use(express.static('./client/dist'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.get('/?id=:restaurantId', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


// /api/module_name/:id

// api/restaurants/5/dateTime/3

// http://localhost:4444/api/reservations/4/dateTime/Wed%20Feb%2012%202020%2019%3A22%3A21%20GMT-0800%20(Pacific%20Standard%20Time)


app.get('/api/reservations/:restaurantId/dateTime/:dateTime', (req, res) => {
  console.log(req.params.restaurantId);
  console.log(req.params.dateTime);
  db.getReservations(
    req.params.restaurantId,
    req.params.dateTime,
    (err, result) => {
      res.json(result);
    },
  );
});


app.get('/api/reservations/:id', (req, res) => {
  db.getReservation(req.params.id, (err, results) => {
    if (err) {
      console.log('error getting id!', err);
    } else {
      console.log('successful get id!');
      res.status(200).json(results);
    }
  });
});

app.post('/api/reservations/', (req, res) => {
  db.postReservation(req.params.restaurantId, req.body.dateTime, (err, results) => {
    if (err) {
      console.log('error posting reservation', err);
    } else {
      console.log('successful post!');
      res.status(201).json(results);
    }
  });
});

app.put('/api/reservations/:id', (req, res) => {
  console.log('this is req body', req.body);
  db.updateReservation(req.params.id, req.body.dateTime, (err, results) => {
    if (err) {
      console.log('error updating id');
    } else {
      res.status(201).json(results);
    }
  })
})

app.delete('/api/reservations/:id', (req, res) => {
  db.deleteReservation(req.params.id, (err, results) => {
    if (err) {
      console.log('error deleting id', err);
    } else {
      console.log('successful delete id');
      res.status(200).json(results);
    }
  });
});


module.exports = app;
