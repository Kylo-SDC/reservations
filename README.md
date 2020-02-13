# Opentable Reservations Module

Reservations input component made using React.

## Installing
```
npm install
```

## Getting Started
```
npm run seed
```
```
npm run build
```
```
npm start
```
## API
**POST** - create a new reservation and datetime\
Accepts a body request of restaurantId and dateTime, sends back 201 created response.
```
'/api/reservations/'
```

**GET** - retrieve a single reservation and its datetimes\
Accepts a parameter request for id and sends back 200 success response.
```
'/api/reservations/:id'
```

**PUT** - update an existing reservation's datetimes\
Accepts a parameter request for id and body request for dateTime, sends back 201 created response.
```
'/api/reservations/:id'
```

**DELETE** - delete a reservation\
Accepts a parameter request for id and sends back 200 success response.

```
'/api/reservations/:id'
```


