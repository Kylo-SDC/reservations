const mysql = require('mysql');
const credentials = require('./credentials');

const connection = mysql.createConnection(credentials);
connection.connect();


const generateReservations = () => {
  const reservations = [];
  for (let i = 0; i < 100; i += 1) {
    const dateTime = new Date();
    dateTime.setDate(dateTime.getDate() - 1);
    for (let j = 0; j < 30; j += 1) {
      dateTime.setDate(dateTime.getDate() + 1);
      dateTime.setHours(0, 0, 0, 0);
      for (let k = 0; k < 96; k += 1) {
        dateTime.setMinutes(dateTime.getMinutes() + 15);
        if (Math.random() > 0.5) {
          reservations.push([null, i, new Date(dateTime)]);
        }
      }
    }
  }
  return reservations;
};

connection.query('DELETE FROM reservation', (deletError) => {
  if (deletError) throw deletError;
  const query = 'INSERT INTO reservation (id, restaurantId, dateTime) VALUES ?';
  const values = generateReservations();
  connection.query(query, [values], (insertError) => {
    if (insertError) throw insertError;
    connection.end();
  });
});
