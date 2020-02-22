import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 10,
  duration: "30s"
};

export default function() {
  let res = http.get("http://localhost:4444/api/reservations/1");
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
};