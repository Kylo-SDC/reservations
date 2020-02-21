const fs = require('fs');

const writable = fs.createWriteStream('CVcdsafdsSpsql.csv');
writable.write('id, restaurantId, dateTime \n');

const seedCVS = async (restaurantId = 100, days = 1, reservations = 30, id = 0) => {
  for (let i = 1; i <= restaurantId; i += 1) {
    const dateTime = new Date();
    dateTime.setDate(dateTime.getDate() - 1);
    // sets number of calendar days per restaurant ID to have reservations
    for (let j = 0; j < days; j++) {
      dateTime.setDate(dateTime.getDate() + 1);
      dateTime.setHours(0, 0, 0, 0);
      // sets number of reservations per day day per restaurant ID
      for (let k = 0; k < reservations; k += 1) {
        dateTime.setMinutes(dateTime.getMinutes() + 45);
        // reservation times randomly spread throughout the day
        if (Math.random() > 0.5) {
          id += 1;
          if (!writable.write(`${id},${i},${new Date(dateTime).toISOString()}\n`)) {
            await new Promise((resolve) => writable.once('drain', resolve));
          }
        }
      }
    }
  }
  console.timeEnd('res');
};

console.time('res');
seedCVS();