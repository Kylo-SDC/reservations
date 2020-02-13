// const cors = require('cors');
// const path = require('path');
// const express = require('express');
// const database = require('../database/index.js');

// const app = express();
// app.use(express.static('./client/dist'));
// app.use(express.json());
// app.use(cors());


// app.get('/?id=:restaurantId', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });


// app.get('/api/reservations/:restaurantId/dateTime/:dateTime', (req, res) => {
//   database.getReservations(
//     req.params.restaurantId,
//     req.params.dateTime,
//     (err, result) => {
//       res.json(result);
//     },
//   );
// });


// module.exports = app;
