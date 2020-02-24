import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const url = 'http://localhost:4444/api/reservations/';
  const body = JSON.stringify({ restaurantId: 20000000, dateTime: new Date() });
  const params = { headers: { 'Content-Type': 'application/json' } };
  const res = http.post(url, body, params);

  check(res, {
    tags: { name: 'get reservations' },
    'status was 201': (r) => r.status == 201,
    'transaction time OK': (r) => r.timings.duration < 2000,
  });
}
