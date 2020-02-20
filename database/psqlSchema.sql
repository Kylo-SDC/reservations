
-- DROP TABLE IF EXISTS reservations;

-- CREATE TABLE reservations (

--   id BIGINT PRIMARY KEY,
--   restaurantId BIGINT NOT NULL,
--   dateTime TIMESTAMP NOT NULL

-- )

COPY reservations(id, restaurantId, dateTime)
FROM '/mnt/c/Users/epyon/Documents/Hack/reservations/database/reservations.csv' DELIMITER ',' CSV HEADER;

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
