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

knex.schema.dropTableIfExists('reservationss')
  .createTable('reservationss', (table) => {
    table.integer('id');
    table.integer('restaurantid').notNullable();
    table.dateTime('datetime', { useTz: false });
  })
  .then(() => console.log('table created'))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
