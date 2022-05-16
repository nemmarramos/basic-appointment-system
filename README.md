<h1 align="center"><strong>Basic appointment system</strong></h1>

## Stack
- AntD design
- Apollo GraphQL

## Features
- User login
- Browse user
- Book an appointment
- Fetch user appointments
- Delete an appoinment

## Installation

### API

1. run `cd api`
2. run `docker-compose up -d` - to run a mysql db instance
3. run `npm run db:migrate` - setup database schema
4. run `npm run db:seed` - to initialize test data
5. run `npm install`
6. run `npm start` or `npm run dev`

#### Test
- `npm run test`
- `npm run test:coverage` - with coverage

### Web

1. run `cd web`
2. run `npm install`
3. run `npm start` or `npm run dev`

## Folder Structure
### API
![Imgur](https://i.imgur.com/gVkPBwG.png)
