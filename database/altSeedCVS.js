const fs = require('fs');
const writable = fs.createWriteStream('reservations.csv');
writable.write(`id, restaurantId, dateTime \n`);

const dateTime = new Date();
// set date prior by 1 day so upon entering loop increments at present day
dateTime.setDate(dateTime.getDate() - 1);

const seedCVS = async (restaurantId, reservations, id = 0) => {

  for (let i = 1; i <= restaurantId; i += 1) {
    dateTime.setDate(dateTime.getDate() + 1);
    dateTime.setHours(0, 0, 0, 0);
    // sets number of reservations per restaurant ID
    for (let k = 0; k < reservations; k += 1) {
      dateTime.setMinutes(dateTime.getMinutes() + 30);
      // reservation times spread throughout the day
      if (Math.random() > 0.5) {
        id += 1;
        if (!writable.write(`${id}, ${i}, ${new Date(dateTime)}\n`)) {
          await new Promise((resolve) => writable.once('drain', resolve));
        };
      }
    }
  }
  console.timeEnd('res');
};

console.time('res');
seedCVS(1000000, 25);
