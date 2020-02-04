import PropTypes from 'prop-types';
import './Reservation.css';
import React, { useState } from 'react';

const Reservation = ({ restaurantId }) => {
  const [slots, setSlots] = useState([]);
  const [showSlots, setShowSlots] = useState(false);
  const [dateTime] = useState(new Date());

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  }

  function findTable() {
    fetch(`/api/reservations/${restaurantId}/dateTime/${encodeURIComponent(dateTime)}`)
      .then((response) => response.json())
      .then((myJson) => {
        setSlots(myJson.map((date) => formatAMPM(new Date(date))));
        setShowSlots(true);
      });
  }

  function setTime(e) {
    dateTime.setHours(...JSON.parse(e.target.value));
    console.log(dateTime);
  }

  function setDate(e) {
    const newDate = new Date(e.target.value);
    newDate.setMinutes(newDate.getTimezoneOffset());
    dateTime.setFullYear(newDate.getFullYear());
    dateTime.setMonth(newDate.getMonth());
    dateTime.setDate(newDate.getDate());
    console.log(dateTime);
  }


  return (
    <div className="reservation-main">
      <div className="reservation-title">Make a reservation</div>
      <div className="reservation-input-container">
        <div className="input-title">Party Size</div>
        <select name="partySize" id="partySize">
          { [...Array(21).keys()].slice(1).map((key) => (
            <option value={key}>
              {`For ${key}`}
            </option>
          ))}
        </select>
        <div className="input-title">Date</div>
        <input className="datepicker" type="date" onChange={setDate} />
        <div className="input-title">Time</div>
        <div className="reservation-time">
          <select name="time" id="time" onChange={setTime}>
            { [...Array(25).keys()].slice(0, 24) // Make 48 time slots (30 min intervals)
              .map((time) => time % 12)
              .map((time) => (time === 0 ? 12 : time))
              .map((time, index) => [
                <option value={JSON.stringify([index, 0])}>
                  {`${time}:00 ${index < 12 ? 'AM' : 'PM'}`}
                </option>,
                <option value={JSON.stringify([index, 30])}>
                  {`${time}:30 ${index < 12 ? 'AM' : 'PM'}`}
                </option>,
              ])}
          </select>
        </div>
      </div>
      {!showSlots
        ? (
          <div>
            <button
              type="button"
              className="reservation-find-table"
              onClick={findTable}
              onKeyDown={findTable}
            >
              Find a Table
            </button>
          </div>
        )
        : (
          <div>
            {slots.map((slot) => <div className="time-slot" key={slot}>{slot}</div>)}
            {slots.length === 0 ? (
              <div className="time-slot-none">
                {'At the moment, there’s no online availability within 2.5 hours. '}
                Have another time in mind?
              </div>
            ) : (null)}
          </div>
        )}
      <div className="reservation-booked">Booked 9 times today</div>
    </div>

  );
};

Reservation.propTypes = {
  restaurantId: PropTypes.string.isRequired,
};

export default Reservation;