

CREATE KEYSPACE IF NOT EXISTS reservations
  WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };

USE reservations;

DROP TABLE IF EXISTS reservations;

CREATE TABLE IF NOT EXISTS reservations (
  id BIGINT,
  restaurantId BIGINT,
  dateTime TIMESTAMP,
  PRIMARY KEY(id)
);

COPY reservations (id,restaurantId,dateTime)
FROM '/mnt/c/Users/epyon/Documents/Hack/reservations/database/reservationz.csv' WITH HEADER=TRUE;


-- INSERT INTO MyColumns (id, Last, First) VALUES ('1', 'Doe', 'John');


-- SOURCE '/mydir/myfile.cql'
-- cqlsh -u 'my_username' -p 'my_password' -f /mydir/myfile.cql