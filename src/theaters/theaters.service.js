const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

//Consolidates and organizes movies and theaters
const reduceMovies = reduceProperties("theater_id", {
    theater_id: ["theater", "theater_id"],
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    created_at: ["movies", null, "created_at"],
    updated_at: ["movies", null, "updated_at"],
    is_showing: ["movies", null, "is_showing"],
    theater_id: ["movies", null, "theater_id"],
  });


//Sql request with knex to retrieve data from the movies and theaters tables
//then consolidates the movies within the particular theater
function list(){
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("m.*", "t.*")
        .then(data => reduceMovies(data), null, 11);
}

module.exports = {
    list,
}