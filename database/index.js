/* eslint-disable no-unused-vars */
const mysql = require('mysql');

const credentials = {
  host: process.env.PORT || 'localhost',
  user: process.env.USER || 'root',
  database: process.env.DATABASE || 'reservation',
};

const connection = mysql.createConnection(credentials);
connection.connect();

const getReservations = async (restaurantId, dateTime, callback) => {
  const dayStart = new Date(dateTime);
  dayStart.setHours(0, 0, 0, 0);

  const dayEnd = new Date(dayStart);
  dayEnd.setHours(23, 45, 0, 0);

  const select = 'SELECT * FROM reservation WHERE restaurantId = ? AND dateTime BETWEEN ? and ?;';
  connection.query(
    select,
    [restaurantId, dayStart, dayEnd],
    (error, results) => {
      if (error) {
        console.error(error);
        callback(error);
      } else {
        callback(null, results.map((record) => record.dateTime));
      }
    },
  );
};

// new DB methods

const getReservation = (id, callback) => {
  const queryStr = 'SELECT * FROM reservation WHERE id = ?';
  connection.query(queryStr, [id], (error, results, fields) => {
    if (error) {
      console.error(error);
      callback(error);
    }
    callback(null, results);
  });
};

const postReservation = (restaurantId, dateTime, callback) => {
  const queryStr = 'INSERT INTO reservation (restaurantId, dateTime) VALUES (?, ?)';
  connection.query(queryStr, [restaurantId, dateTime], (error, results, fields) => {
    if (error) {
      console.error(error);
      callback(error);
    }
    callback(null, results);
  });
};

const updateReservation = (id, newDateTime, callback) => {
  const queryStr = 'UPDATE reservation SET dateTime = ? WHERE id = ?';
  connection.query(queryStr, [newDateTime, id], (error, results, fields) => {
    if (error) {
      console.error(error);
      callback(error);
    }
    callback(null, results);
  });
};

const deleteReservation = (id, callback) => {
  const queryStr = 'DELETE FROM reservation WHERE id = ?';
  connection.query(queryStr, [id], (error, results, fields) => {
    if (error) {
      console.error(error);
      callback(error);
    }
    callback(null, results);
  });
};

module.exports = {
  getReservations,
  getReservation,
  postReservation,
  updateReservation,
  deleteReservation,
};

// module.exports.getReservations = getReservations;
// module.exports.connection = connection;
