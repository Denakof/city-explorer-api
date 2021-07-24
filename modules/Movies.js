"use strict";
const express = require("express");

const server = express();

const axios = require("axios");
module.exports = movieHandler;
let memo = {};
function movieHandler(request, response) {
  const searchQuery = request.query.city_name;

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.api_key}&query=${searchQuery}`;
  if (memo[searchQuery] !== undefined) {
    console.log("catch ittt");
    response.send(memo[searchQuery].map((item) => {
      return new Movie(item);
    })
  );
  

  } else {
    axios
      .get(url)
      .then((movieData) => {
        console.log("catch this 1");
        memo[searchQuery] = movieData.data.results;
        response.status(200).send(
          movieData.data.results.map((item) => {
            return new Movie(item);
          })
        );
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  }
}

class Movie {
  constructor(item) {
    this.title = item.original_title;
    this.overview = item.overview;
    this.averge_votes = item.vote_average;
    this.total_votes = item.vote_count;
    this.img_url = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
    this.popularity = item.popularity;
    this.released_on = item.release_date;
  }
}
