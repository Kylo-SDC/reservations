import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 100,
  rps: 100,
  duration: "200s"
};

var random = Math.round(Math.random() * 1000000) + 9000000;

export default function() {
  let res = http.get(`http://localhost:4444/api/reservations/${random}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
};