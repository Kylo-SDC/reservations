/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import './Reservation.css';
import React, { useState } from 'react';

const Reservation = ({ restaurantId }) => {
  const [slots, setSlots] = useState([]);
  const [showSlots, setShowSlots] = useState(false);
  const [taken, setTaken] = useState(0);
  const [dateTime] = useState(new Date());

  fetch(`http://localhost:4444/api/reservations/${restaurantId}/dateTime/${encodeURIComponent(dateTime)}`)
    .then((response) => response.json())
    .then((myJson) => setTaken(myJson.length));

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
    fetch(`http://localhost:4444/api/reservations/${restaurantId}/dateTime/${encodeURIComponent(dateTime)}`)
      .then((response) => response.json())
      .then((myJson) => {
        const minusHourFifteen = new Date(dateTime);
        minusHourFifteen.setHours(minusHourFifteen.getHours() - 1);
        minusHourFifteen.setMinutes(minusHourFifteen.getMinutes() - 15);

        const plusHourFifteen = new Date(dateTime);
        plusHourFifteen.setHours(plusHourFifteen.getHours() + 1);
        plusHourFifteen.setMinutes(plusHourFifteen.getMinutes() + 15);

        setSlots(myJson
          .map((date) => new Date(date))
          .filter((date) => date.getTime() >= minusHourFifteen.getTime()
              && date.getTime() <= plusHourFifteen.getTime())
          .map((date) => formatAMPM(new Date(date))));
        setShowSlots(true);
      });
  }


  function setTime(e) {
    dateTime.setHours(...JSON.parse(e.target.value));
  }

  function setDate(e) {
    const newDate = new Date(e.target.value);
    newDate.setMinutes(newDate.getTimezoneOffset());
    dateTime.setFullYear(newDate.getFullYear());
    dateTime.setMonth(newDate.getMonth());
    dateTime.setDate(newDate.getDate());
  }


  return (
    <div className="reservation-main">
      <div className="reservation-title">Make a reservation</div>
      <div className="reservation-input-container">
        <div className="input-title">Party Size</div>
        <select name="party-size" id="party-size" className="party-dropdown">
          { [...Array(21).keys()].slice(1).map((key) => (
            <option value={key}>
              {`For ${key}`}
            </option>
          ))}
        </select>
        <div className="reservation-input-container">
          <div className="date-time-container">
            <div className="vertial-container">
              <div className="input-title">Date</div>
              <input
                className="dropdown"
                type="date"
                onChange={setDate}
                onClick={() => { setShowSlots(false); }}
              />
            </div>
            <div className="vertial-container" id="time-container">
              <div className="input-title">Time</div>
              <div className="reservation-time">
                <select
                  name="time"
                  id="time-selector"
                  className="dropdown"
                  onChange={setTime}
                  onClick={() => { setShowSlots(false); }}
                >
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
          </div>
          {!showSlots
            ? (
              <div>
                <div
                  /* type="button" */
                  className="reservation-find-table-button"
                  onClick={findTable}
                  onKeyDown={findTable}
                >
                  <span>
                    Find a Table
                  </span>
                </div>
              </div>
            )
            : (
              <div className="slot-box">
                {slots.map((slot) => (
                  <div
                    className="time-slot"
                    onClick={() => { setShowSlots(false); }}
                    key={slot}
                  >
                    {slot}
                  </div>
                ))}
                {slots.length === 0 ? (
                  <div className="time-slot-none">
                    <div>
                      <img className="icon" src="http://localhost:4444/ic_negative.svg" />
                    </div>
                    <div>
                      {'At the moment, there’s no online availability within 2.5 hours. '}
                      Have another time in mind?
                    </div>
                  </div>
                ) : (null)}
              </div>
            )}
        </div>
      </div>
      <div className="booked-box">
        <img className="icon" src="http://localhost:4444/ic_social_proof.svg" />
        <div className="reservation-booked">{`Booked ${taken} times today`}</div>
      </div>
      <div className="specials">
        <div>
          <span>Special offers available. </span>
          <span id="see-details">See details</span>
        </div>
      </div>
    </div>
  );
};

Reservation.propTypes = {
  restaurantId: PropTypes.string.isRequired,
};

export default Reservation;
