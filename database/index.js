/* eslint-disable no-unused-vars */
const mysql = require('mysql');
const credentials = require('./credentials');

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

//////////////////////////////////////////////////////////////////////////////////////////////////////

const getRestaurantId = (restaurantId, callback) => {
  const queryStr = 'SELECT * FROM reservation WHERE id = ?';
  connection.query(queryStr, [restaurantId], (error, results, fields) => {
    if (error) {
      throw error;
    }
    callback(error, results);
  });
}

const postReservation = (restaurantId, dateTime, callback) => {
  const queryStr = 'INSERT INTO reservation '
}

const deleteRestaurantId = (restaurantId, callback) => {
  const queryStr = 'DELETE FROM reservation WHERE restaurant_id = ?';
  connection.query(queryStr, [restaurantId], (error, results, fields) => {
    if (error) {
      throw error;
    }
    callback(error, results);
  });
}




module.exports.getReservations = getReservations;
module.exports.connection = connection;
