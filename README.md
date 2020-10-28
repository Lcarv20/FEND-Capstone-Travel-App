# FEND-Capstone-Travel-App

Travel Web App

This is the capstone project given by Udacity. It provides users info about the weather on a given location at a certain date (max 16 days)

For this project I have used the following tools:

1. webpack
1. express
1. sass
1. jest (testing)

### APIs

In this project I have used 3 external APIs for retrieving data, and they are the following:

1. WeatherBit(weather)
1. Geonames(coordinates for weatherbit)
1. Pixabay(images)

=> To run this app you will need the api keys(username in case of geonames), and those can be written in a .env file and passed down to the corresponding variables to the server.js file.

### Setup

- To set up run `npm i` (to install all packages), and in case of vulnerabilities
  `npm audit fix` (sometimes it might need extra work).

If you want to run full dev mode, open 3 terminal tabs and on each run one of the following comamnds

1. `npm run build-prod` (it will create dist folder to serve)
1. `npm run build-dev` (will run hot reload from webpack at port 8080)
1. `npm start` (will run your server code at port 8081)
1. `npm test`

or simply run `npm start` and open browser on localhost:8081
