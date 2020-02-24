// require('newrelic');
const app = require('./app');
require('dotenv').config();

// const port = process.env.PORT || 5555;

const port = process.env.PORT || 5555;

app.listen(port, () => console.log(`listening on port ${port}!`));
