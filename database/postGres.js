// require('dotenv').config();
const { Pool, Client } = require('pg');

const connectionString = process.env.PSQLSTRING || 'postgresql://postgres:postgres@localhost:5432/reservations';

const pool = new Pool({
  connectionString,
});

pool.connect();

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res.rows);
//   pool.end();
// });

const getReservations = async (restaurantId, dateTime, callback) => {
  const dayStart = new Date(dateTime);
  dayStart.setHours(0, 0, 0, 0);

  const dayEnd = new Date(dayStart);
  dayEnd.setHours(23, 45, 0, 0);

  const queryStr = 'SELECT * FROM reservations WHERE restaurantid = $1 AND datetime BETWEEN $2 and $3;';
  pool.query(
    queryStr,
    [restaurantId, dayStart, dayEnd],
    (error, results) => {
      // Had to change dates to numerical form first, filter out duplicates, change back to dates, can't directly compare date objects as being equal
      const uniqueDates = [...new Set(results.rows.map((e) => e.datetime.getTime()))].map((e) => new Date(e));
      // const datetimes = results.rows.map((data) => data.datetime);
      if (error) {
        console.error(error);
        callback(error);
      } else {
        callback(null, uniqueDates);
      }
    },
  );
};


const getRestaurantId = (restaurantId, callback) => {
  const queryStr = 'SELECT * FROM reservations WHERE restaurantId = $1';
  pool.query(queryStr, [restaurantId], (error, results) => {
    if (error) {
      console.error(error);
      callback(error);
    }
    callback(null, results.rows);
  });
};

const postReservation = (id, restaurantId, dateTime, callback) => {
  const queryStr = 'INSERT INTO reservations (id, restaurantId, dateTime) VALUES ($1, $2, $3)';
  pool.query(queryStr, [id, restaurantId, dateTime], (error, results) => {
    console.log(results.rows);
    if (error) {
      console.error(error);
      callback(error);
    }
    callback(null, results.rows);
  });
};

const updateReservation = (newDateTime, id, callback) => {
  const queryStr = 'UPDATE reservations SET dateTime = $1 WHERE id = $2';
  pool.query(queryStr, [newDateTime, id], (error, results) => {
    if (error) {
      console.error(error);
      callback(error);
    }
    callback(null, results.rows);
  });
};

const deleteReservation = (id, callback) => {
  const queryStr = 'DELETE FROM reservations WHERE id = $1 ';
  pool.query(queryStr, [id], (error, results) => {
    console.log(results);
    if (error) {
      console.error(error);
      callback(error);
    }
    callback(null, results.rows);
  });
};


// module.exports = { pool };

module.exports = {
  getReservations,
  getRestaurantId,
  postReservation,
  updateReservation,
  deleteReservation,
};


// const client = new Client({
//   host: 'localhost',
//   user: 'postgres',
//   password: 'postgres',
//   database: 'reservations',
// });

// client.connect()
//   .then(() => console.log('successful connection!'))
//   .then(() => client.query('SELECT * from reservations where restaurantId = 1'))
//   .then(results => console.table(results.rows))
//   .catch(e => console.log(e))
//   .finally(() => client.end());


// client.query('SELECT * from reservations', (err, res) => {
//   console.log(err, res);
//   client.end();
// });
