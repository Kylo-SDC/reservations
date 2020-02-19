require('dotenv').config();

const options = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    database: 'reservation',
  },
};

const knex = require('knex')(options);

const seed = async (restaurantId = 10000000, days = 1, reservations = 30) => {
  await knex('reservation').del();

  let reservationsArray = [];
  for (let i = 1; i <= restaurantId; i += 1) {
    const dateTime = new Date();
    dateTime.setDate(dateTime.getDate() - 1);
    // sets approx number of future days per restaurant ID to have reservations
    for (let j = 0; j < days; j++) {
      dateTime.setDate(dateTime.getDate() + 1);
      dateTime.setHours(0, 0, 0, 0);
      // sets number of reservations per day day per restaurant ID
      for (let k = 0; k < reservations; k += 1) {
        dateTime.setMinutes(dateTime.getMinutes() + 45);
        // reservation times randomly spread throughout the day
        if (Math.random() > 0.5) {
          reservationsArray.push({restaurantId:i, dateTime: new Date(dateTime)});
        }
        // write to file with upon every 10000 items in reservations array
        if (i % 10000 === 0) {
          await knex('reservation').insert(reservationsArray);
          reservations = [];
        }
    }
  }
  console.timeEnd('reservations');
  console.log('finished seeding database');
  knex.destroy();
};

console.time('reservations');
seed();



// const seed = async (restaurantsTotal) => {
//   await knex('reservation').del();

//   let reservations = [];

//   for (let i = 1; i <= restaurantsTotal; i += 1) {
//     for (let j = 0; j < 5; j += 1) {
//       reservations.push({restaurantId:i, dateTime: new Date()});
//     }

//     if (i % 10000 === 0) {
//       await knex('reservation').insert(reservations);
//       reservations = [];
//     }
//   }
//   console.timeEnd('reservations');
//   console.log('finished seeding database');
//   knex.destroy();
// };
