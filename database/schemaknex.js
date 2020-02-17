const options = {
  client: 'mysql',
  connection: {
    host: process.env.PORT || 'localhost',
    user: process.env.USER || 'root',
    database: process.env.DATABASE || 'reservation',
  },
};

const knex = require('knex')(options);

knex.schema.dropTableIfExists('reservation')
  .createTable('reservation', (table) => {
    table.increments('id').unsigned();
    table.integer('restaurantId').notNullable();
    table.dateTime('dateTime');
  })
  .then(() => console.log('table created'))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
