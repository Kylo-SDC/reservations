// require('dotenv').config();
const { Pool, Client } = require('pg');
const connectionString = process.env.PSQLSTRING || 'postgresql://postgres:postgres@localhost:5432/reservations';

const pool = new Pool({
  connectionString: connectionString,
});

pool.connect()

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res.rows);
  pool.end();
});


const getRestaurantId = (id, callback) => {
  const queryStr = 'SELECT * FROM reservations WHERE restaurantId = ?1';
  pool.query(queryStr, [id], (error, results) => {
    if (error) {
      console.error(error);
      callback(error);
    }
    callback(null, results);
  });
};

const postReservation = (restaurantId, dateTime, callback) => {
  const queryStr = 'INSERT INTO reservations (restaurantId, dateTime) VALUES (?1, ?2)';
  pool.query(queryStr, [restaurantId, dateTime], (error, results) => {
    if (error) {
      console.error(error);
      callback(error);
    }
    callback(null, results);
  });
};

const updateReservation = (id, newDateTime, callback) => {
  const queryStr = 'UPDATE reservations SET dateTime = ? WHERE id = ?1';
  pool.query(queryStr, [newDateTime, id], (error, results) => {
    if (error) {
      console.error(error);
      callback(error);
    }
    callback(null, results);
  });
};

const deleteReservation = (id, callback) => {
  const queryStr = 'DELETE FROM reservation WHERE id = ?1';
  pool.query(queryStr, [id], (error, results) => {
    if (error) {
      console.error(error);
      callback(error);
    }
    callback(null, results);
  });
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
