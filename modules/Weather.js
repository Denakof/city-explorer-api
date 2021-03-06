"use strict";

const axios = require("axios");
let memo = {};
const weatherFun = (server) => {
  server.get("/weather", weatherHandler);

  async function weatherHandler(request, response) {
    try {
      let searchQuery = request.query.city_name;
      if (memo[searchQuery] !== undefined) {
        response.send(memo[searchQuery].map((day) => new Weather(day)));
      } else {
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`;
        axios.get(url).then((weatherData) => {
          // console.log(weatherData.data.data);
          memo[searchQuery] = weatherData.data.data;
          response.send(weatherData.data.data.map((day) => new Weather(day)));
        });
      }
    } catch (error) {
      response.status(200).send(error);
    }
  }
};

class Weather {
  constructor(data) {
    this.description = data.weather.description;
    this.date = data.datetime;
    // console.log(data);
  }
}

module.exports = weatherFun;
