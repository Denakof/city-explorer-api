"use strict";
const express = require("express");

const server = express();
require("dotenv").config();

const cors = require("cors");
server.use(cors());

const axios = require("axios");

const weatherData = require("./data/weather.json");
const { response } = require("express");

const weatherHandler = require("./modules/Weather.js");
const movieHandler = require("./modules/Movies.js");
weatherHandler(server);
// const PORT = 3005;
const PORT = process.env.PORT;

server.get("/", (request, response) => {
  response.status(200).send("home route");
});

// localhost:3001/
server.get("/test", (request, response) => {
  response.status(200).send("my server is working");
});
server.get("/weather", (request, response) => {
  try {
    let searchQuery = request.query.city_name;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`;

    axios
      .get(url)
      .then(
        response.send(searchQuery.data.data.map((day) => new Weather(day)))
      );
  } catch (error) {
    response.status(200).send(error);
  }
});
server.get("/movie", movieHandler);

class Weather {
  constructor(data) {
    this.description = data.weather.description;
    this.date = data.datetime;
    console.log(data);
  }
}
server.get("*", (request, response) => {
  response.status(404).send("NOT FOUND");
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
