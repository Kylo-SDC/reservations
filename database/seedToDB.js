const options = {
  client: 'mysql',
  connection: {
      host: 'localhost',
      user: 'root',
      database: 'reservation'
  }
const knex = require('knex')(options);


// works for seeding to most SQL based DBs relatively quickly

const seed = async () => {
  await knex('reservation').del();

  let reservations = [];
  for (let i = 1; i <= 10000; i += 1) {
    for (let j = 1; j <= 1000; j += 1) {
      reservations.push({restaurantId:i, dateTime: new Date()});
    }

    if (i % 100 === 0) {
      await knex('reservation').insert(reservations);
      reservations = [];
    }
  }
  console.timeEnd('reservations');
  console.log('finished seeding database');
  knex.destroy();
};

console.time('reservations');
seed();
