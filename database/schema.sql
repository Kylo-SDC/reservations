
DROP TABLE IF EXISTS reservations;

CREATE SCHEMA reservations (


  restaurantId PRIMARY KEY,
  dateTime DATETIME



)










-- //////////// mySQL schema ///////////

-- DROP DATABASE IF EXISTS reservation;

-- CREATE DATABASE reservation;

-- USE reservation;

-- CREATE TABLE reservation (
--   id INT NOT NULL AUTO_INCREMENT,
--   restaurantId INT NOT NULL,
--   dateTime DATETIME,
--   PRIMARY KEY (id)

-- );


-- mysql -u root < schema.sql
