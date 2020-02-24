import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 10,
  rps: 10,
  duration: '30s',
};

const addy = 'http://localhost:4444/api/reservations';
const random = Math.round(Math.random() * 1000000) + 9000000;

// export default function () {
//   const res = http.get(`${addy}/${random}`);
//   check(res, {
//     tags: { name: 'get reservations' },
//     'status was 200': (r) => r.status == 200,
//     'transaction time OK': (r) => r.timings.duration < 2000,
//   });
// }

export default function () {
  const res = http.get('http://localhost:4444/api/reservations/100000/dateTime/Mon%20Feb%2024%202020%2010%3A56%3A03%20GMT-0800%20(Pacific%20Standard%20Time)');
  check(res, {
    tags: { name: 'get reservations' },
    'status was 200': (r) => r.status == 200,
    'transaction time OK': (r) => r.timings.duration < 200,
  });
}


// export default function () {
//   const req1 = {
//     method: 'GET',
//     url: `${addy}/${random}`,
//     tags: { name: 'get reservations' }
//   };

//   const req2 = {
//     method: 'GET',
//     url: `${addy}/${random}`,
//     tags: { name: 'get reservations' }
//   };

//   const req3 = {
//     method: 'GET',
//     url: `${addy}/${random}`,
//     tags: { name: 'get reservations' }
//   };

//   const res = http.batch([req1, req2, req3]);

//   check(res[0], {
//     'status was 200': (r) => r.status == 200,
//     'transaction time OK': (r) => r.timings.duration < 200,
//   });
//   check(res[1], {
//     'status was 200': (r) => r.status == 200,
//     'transaction time OK': (r) => r.timings.duration < 200,
//   });
//   check(res[2], {
//     'status was 200': (r) => r.status == 200,
//     'transaction time OK': (r) => r.timings.duration < 200,
//   });
// }
