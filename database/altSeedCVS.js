// 'use strict'


const seedCVS = async (restaurantsTotal) => {

  for (let i = 1; i <= restaurantsTotal; i += 1) {
    dateTime.setDate(dateTime.getDate() + 1);
    dateTime.setHours(0, 0, 0, 0);
    // sets number of reservations per restaurant ID, approx 48
    for (let k = 0; k < 10; k += 1) {
      dateTime.setMinutes(dateTime.getMinutes() + 15);
      // reservation times spread throughout the day
      if (Math.random() > 0.5) {
        id += 1;
        if ((i % restaurantsTotal) === 0) {
          console.log(i);
          console.timeEnd('res');
        }
        if (!writable.write(`${id}, ${i}, ${new Date(dateTime)}\n`)) {
          await new Promise((resolve) => writable.once('drain', resolve));
        };
      }
    }
  }
};

console.time('res');
seedCVS();
