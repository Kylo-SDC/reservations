/* eslint-disable max-len */
const fs = require('fs');
// const faker = require('faker');


const date = new Date().toString().slice(0, 10);

const generateTime = () => {

  // adds 0 in front of single digits
  const hour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
  const min = Math.floor(Math.random() * 60).toString().padStart(2, '0');

  return `${hour}:${min}:00`;
};


const generateRestaurants = (restaurantsNum) => {

  // write to location reservations.csv
  const writeReservations = fs.createWriteStream('reservation.csv');
  // set restaurant id to the input value passed into the function later to be consumed
  let restaurantId = restaurantsNum;
  // set number of reservations created per restaurant ID
  let reservationsNum = 15;
  // set reservations id equal to the total of restaurants and the reservations attached to them
  let reservationsId = restaurantId * reservationsNum;
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

      // decrement total number of reservations with each iteration
      reservationsId -= 1;
      // decrement number of reservations per restaurant with each iteration
      reservationsNum -= 1;
      // after all reservations have been assigned to a given restaurantId, then we decrement restaurantId
      if (reservationsNum === 0) {
        restaurantId -= 1;
        // reestablish number of reservations to be assigned to the next restaurantID
        reservationsNum = 15;
      }
      if (restaurantId === 0) {
        console.timeEnd('reservations');
      }
      // if restaurantIds have been fully decremented
      if (restaurantId < 0) {
        // exit out of writing
        writeReservations.end();
      } else {
        // otherwise boolean wil be set to false when unable to write
        canWrite = writeReservations.write(`${restaurants.id}, ${restaurants.restaurantId}, ${restaurants.dateTime} \n`);
      }
    // if number of remaining restaurant IDs is greater than 0 and we can still write to csv, continue
    } while (restaurantId > 0 && canWrite);

    // move to this line if we can no longer write to the file but still have remaining restaurant IDs to be written
    if (restaurantId > 0) {
      writeReservations.once('drain', generateData);
    }
  };
  generateData();
};

// begin timer on seed function
console.time('reservations');
generateRestaurants(10000000);
