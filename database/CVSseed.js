// var moment = require('moment');
// moment().format();
/* eslint-disable max-len */
const fs = require('fs');

// Not good enough
// const generateTime = () => {
//   const hour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
//   const min = [0, 15, 30, 45][Math.floor(Math.random() * 4)].toString().padStart(2, '0');

//   return `${hour}:${min}:00`;
// };

// // alternate
// // each hour in the day where restaurants take reservations, military time
// const times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
// // assign a value per time, respectively, in terms of popularity with 3 being the highest
// // 8:1, 9:1, 10:2, 11:3 ..
// const weights = [1, 1, 2, 3, 3, 3, 2, 1, 1, 2, 3, 3, 3, 2, 1];
// // storage array which will hold a number of times equal to their weight
// // [8] -> [8,9] -> [8,9,10] -> [8,9,10,10..]
// const arr = [];
// let timesIndex = 0;

// while (timesIndex < times.length) {
//   for (let i = 0; i < weights[timesIndex]; i++) {
//     arr.push(times[timesIndex]);
//   }
//   timesIndex++;
// }

// // the sum of all our weights, which will be used in our random number generator to find index
// const totalweight = weightsPerTime.reduce((a, b) => a + b);

// const randomWeightedHour = () => times[Math.floor(Math.random() * totalweight)];

const randomHour = () => {
  const busy = [11, 12, 13, 17, 18, 19];
  const medium = [10, 14, 20, 21];
  const slow = [8, 9, 15, 16, 22];

  const random = Math.random() * 6;
  // ratio of 1:2:3 low:medium:high number of reservations per times
  if (random < 1) return slow[Math.floor(Math.random() * slow.length)];
  if (random >= 1 && random < 3) return medium[Math.floor(Math.random() * medium.length)];
  return busy[Math.floor(Math.random() * busy.length)];
};

const randomDate = (addDays = 2) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate() + Math.floor(Math.random() * addDays);
  const hour = randomHour();
  const min = [0, 15, 30, 45][Math.floor(Math.random() * 4)];

  return new Date(year, month, day, hour, min).toString().slice(0, 24);
};

const generateRestaurants = (restaurantsNum) => {
  // Add one more for last iteration
  const totalRestaurants = restaurantsNum + 1;
  // write to location
  const writeReservations = fs.createWriteStream('CVS.csv');
  // write headers (id, restaurantId, dateTime)
  writeReservations.write('id, restaurantId, dateTime \n');
  // set restaurant id to the input value passed into the function later to be consumed
  let restaurantId = 1;
  // set number of reservations created per restaurant ID
  let reservationsNum = 20;
  let reservationsId = 1;
  // set boolean to track whether can write to file
  let canWrite = true;


  const generateData = () => {
    do {
      // initialize object storage with properties to be written to csv
      const restaurants = {};
      restaurants.id = reservationsId;
      restaurants.restaurantId = restaurantId;
      restaurants.dateTime = randomDate();

      // increment total number of reservations with each iteration
      reservationsId += 1;
      // decrement number of reservations per restaurant with each iteration
      reservationsNum -= 1;
      // after all reservations have been assigned to a given restaurantId, then we decrement restaurantId
      if (reservationsNum === 0) {
        restaurantId += 1;
        // reestablish number of reservations to be assigned to the next restaurantID
        reservationsNum = 20;
      }
      if (restaurantId === totalRestaurants) {
        console.timeEnd('reservation');
      }
      // if restaurantIds have been fully incremented
      if (restaurantId > totalRestaurants) {
        writeReservations.end();
      } else {
        canWrite = writeReservations.write(`${restaurants.id},${restaurants.restaurantId},${restaurants.dateTime}\n`);
      }
    // if number of remaining restaurant IDs is greater than 0 and we can still write to csv, continue
    } while (restaurantId < totalRestaurants && canWrite);

    // move to this line if we can no longer write to the file but still have remaining restaurant IDs to be written
    if (restaurantId < totalRestaurants) {
      writeReservations.once('drain', generateData);
    }
  };
  generateData();
};

// begin timer on seed function
console.time('reservation');
generateRestaurants(100);
