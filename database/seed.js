/* eslint-disable max-len */
const fs = require('fs');
const faker = require('faker');


const generateRestaurants = (numOfRestaurants) => {

  // write to location reservations.csv
  const writeReservations = fs.createWriteStream('reservations.csv');
  // set restaurant id to the input value passed into the function later to be consumed
  let restaurantId = numOfRestaurants + 1;
  // set number of reservations created per restaurant ID
  let reservationsNum = 5;
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
      restaurants.dateTime = faker.date.recent();

      // decrement total number of reservations with each iteration
      reservationsId -= 1;
      // decrement number of reservations per restaurant
      reservationsNum -= 1;
      // after all reservations have been assigned to a given restaurantId, then we decrement restaurantId
      if (reservationsNum === 0) {
        restaurantId -= 1;
        // reestablish number of reservations to be assigned to the next restaurantID
        reservationsNum = 5;
      }

      // if restaurantIds have been fully decremented
      if (restaurantId === 0) {
        // end timer on seed function and log in milliseconds time for completion
        console.timeEnd('reservations');
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
generateRestaurants(100);

      // enter for loop (will provide the number of restaurant ids we want)
      // initialize dateTime var set to new Date
        // enter for loop (will provide the number of days we want to establish), reintialize dateTime hours and minutes to 0
          // next loop will indicate the hours/minutes on each day to be set, reintialize dateTime var incrementing by 15 minutes
          // write to file the id, restaurantId, and dateTime
          // decrement id,


// const generateReservations = () => {
//   const reservations = [];
//   for (let i = 0; i < 100; i += 1) {
//     const dateTime = new Date();
//     dateTime.setDate(dateTime.getDate() - 1);
//     for (let j = 0; j < 30; j += 1) {
//       dateTime.setDate(dateTime.getDate() + 1);
//       dateTime.setHours(0, 0, 0, 0);
//       for (let k = 0; k < 96; k += 1) {
//         dateTime.setMinutes(dateTime.getMinutes() + 15);
//         if (Math.random() > 0.5) {
//           reservations.push([null, i, new Date(dateTime)]);
//         }
//       }
//     }
//   }
//   return reservations;
// };