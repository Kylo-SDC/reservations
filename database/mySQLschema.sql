
-- DROP TABLE IF EXISTS reservations;

-- CREATE TABLE reservations (

--   id BIGINT,
--   restaurantId BIGINT NOT NULL PRIMARY KEY,
--   dateTime text

-- )

COPY reservations(id, restaurantId)
FROM '/mnt/c/Users/epyon/Documents/Hack/reservations/database/reservation.csv' DELIMITER ',' CSV HEADER;

-- psql postgresql://postgres:postgres@localhost/reservations -f schema.sql
-- psql -f database/schema.sql reservations
-- psql -h localhost -d reservations -U postgres -p 5432 -a -q -f schema.sql reservations



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
