// const options = {
//   client: 'mysql',
//   connection: {
//     host: 'localhost',
//     user: 'root',
//     database: 'reservation',
//   },
// };

const options = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'reservations',
  },
};

const knex = require('knex')(options);

knex.schema.dropTableIfExists('reservations')
  .createTable('reservations', (table) => {
    table.increments('id');
    table.integer('restaurantId').notNullable();
    table.dateTime('dateTime', { useTz: false });
  })
  .then(() => console.log('table created'))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
