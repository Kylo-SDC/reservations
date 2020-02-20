/* eslint-disable max-len */
const fs = require('fs');
// const faker = require('faker');

const date = new Date().toISOString().slice(0, 10);

const generateTime = () => {
  // adds 0 in front of single digits
  const hour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
  const min = [0, 15, 30, 45][Math.floor(Math.random() * 4)].toString().padStart(2, '0');

  return `${hour}:${min}:00`;
};

const generateRestaurants = (restaurantsNum) => {

  // run one more iteration on final
  const totalRestaurants = restaurantsNum + 1;
  // write to location reservations.csv
  const writeReservations = fs.createWriteStream('reservationz.csv');
  // set restaurant id to the input value passed into the function later to be consumed
  let restaurantId = 1;
  // set number of reservations created per restaurant ID
  let reservationsNum = 15;
  let reservationsId = 1;
  // set boolean to track whether can write to file
  let canWrite = true;
  // write headers (id, restaurantId, dateTime)
  writeReservations.write(`id, restaurantId, dateTime \n`);


  const generateData = () => {
    do {
      // initialize object storage with properties to be written to csv
      const restaurants = {};
      restaurants.id = reservationsId;
      restaurants.restaurantId = restaurantId;
      restaurants.dateTime = `${date} ${generateTime()}`;

      // increment total number of reservations with each iteration
      reservationsId += 1;
      // decrement number of reservations per restaurant with each iteration
      reservationsNum -= 1;
      // after all reservations have been assigned to a given restaurantId, then we decrement restaurantId
      if (reservationsNum === 0) {
        restaurantId += 1;
        // reestablish number of reservations to be assigned to the next restaurantID
        reservationsNum = 15;
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
generateRestaurants(10000000);
