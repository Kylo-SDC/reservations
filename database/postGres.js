
const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:postgres@localhost:5432/reservations';

const pool = new Pool({
  connectionString: connectionString,
});

pool.query('SELECT * from reservations', (err, res) => {
  console.log(err, res);
  pool.end();
});



// const { Pool, Client } = require('pg');


// const pool = new Pool({
//   host: 'localhost',
//   user: 'postgres',
//   password: 'postgres',
//   database: 'reservations',
//   port: 5432,
// });

// pool.query('SELECT * from reservations', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

// const client = new Client({
//   host: 'localhost',
//   user: 'postgres',
//   password: 'postgres',
//   database: 'reservations',
// });

// client.connect()
//   .then(() => console.log('successful connection!'))
//   .then(() => client.query('SELECT * from reservations'))
//   .then(results => console.table(results.rows))
//   .catch(e => console.log(e))
//   .finally(() => client.end());


// client.query('SELECT * from reservations', (err, res) => {
//   console.log(err, res);
//   client.end();
// });
