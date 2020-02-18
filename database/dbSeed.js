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

const seed = async (restaurantsTotal) => {
  await knex('reservation').del();

  let reservations = [];
  let dateTime = new Date();
  // set date 1 day prior to current day, so upon increment in loop starts back at present
  dateTime.setDate(dateTime.getDate() - 1);

  for (let i = 1; i <= restaurantsTotal; i += 1) {
    dateTime.setDate(dateTime.getDate() + 1);
    dateTime.setHours(0, 0, 0, 0);
    // sets number of reservations per restaurant ID
    for (let j = 0; j < 10; j += 1) {
      dateTime.setMinutes(dateTime.getMinutes() + 15);
      // reservation times spread throughout the day
      if (Math.random() > 0.5) {
        reservations.push({restaurantId:i, dateTime: new Date(dateTime)});
      }
    }

    // write to file with upon every 10000 items in reservations array
    if (i % 10000 === 0) {
      await knex('reservation').insert(reservations);
      reservations = [];
    }
  }
  console.timeEnd('reservations');
  console.log('finished seeding database');
  knex.destroy();
};

console.time('reservations');
seed(100);



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
