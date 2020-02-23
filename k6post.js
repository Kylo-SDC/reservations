import http from "k6/http";
import { check, fail } from "k6";

export let options = { maxRedirects: 10 };

const baseURL = "https://dev-li-david.pantheonsite.io";

export default function() {
  // Fetch the login page, with the login HTML form
  let url = 'http://localhost:4444/api/reservations/';

  // Create an Object containing the form data
  var date = new Date();
  let formdata = {
    id: 150000000,
    restaurantId: 10000001,
    dateTime: date
  };
  let headers = { "Content-Type": "application/json" };
  // Send request
  res = http.post(url, formdata, { headers: headers });
  // Verify that we ended up on the user page
  check(res, {
    "status is 200": (r) => r.url == `${baseURL}/users/testuser1`,
  }) || fail("login failed");
}


export default function() {
  let res = http.get(`http://localhost:4444/api/reservations/`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
};
