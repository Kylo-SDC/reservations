const { Pool, Client } = require('pg');


const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'reservations',
  port: 3211,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'reservations',
  port: 3211,
});

client.connect();

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  client.end();
});
