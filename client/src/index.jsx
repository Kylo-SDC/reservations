import Reservation from './Reservation.jsx';

const ReactDOM = require('react-dom');
const React = require('react');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(urlParams);
console.log(id);
ReactDOM.render(
  <Reservation restaurantId={id} />,
  document.getElementById('reservations'),
);
