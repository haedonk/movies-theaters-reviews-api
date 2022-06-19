const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//This function maps properties of the critics object and groups them together
const addCritic = mapProperties({
    critic_id : "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at"
});

//Sql request with knex to retrieve data from the movies table
function list() {
    return knex("movies")
        .select(
            "movie_id as id", 
            "title", 
            "runtime_in_minutes",
            "rating",
            "description",
            "image_url"
            );
        
}

//Sql request with knex to retrieve data from the movies table
function listShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select(
            "m.movie_id as id", 
            "m.title", 
            "m.runtime_in_minutes",
            "m.rating",
            "m.description",
            "m.image_url"
            )
        .where({ "mt.is_showing": true })
        .groupBy("id")
        .orderBy("id");
}


//Sql request with knex to retrieve a specific movie from the movies table
function read(movieId) {
    return knex("movies as m")
        .select(
            "m.movie_id", 
            "m.title", 
            "m.runtime_in_minutes",
            "m.rating",
            "m.description",
            "m.image_url",
            "m.updated_at",
            "m.created_at"
            )
        .where({ "m.movie_id": movieId })
        .first();
        
}

//Sql request with knex to retrieve data from the movies and theaters tables
function movieByTheaters(movieId){
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select("t.*", "mt.movie_id")
        .where({ "mt.is_showing": true })
        .andWhere({ "mt.movie_id": movieId })
}

//Sql request with knex to retrieve data from the reviews and critics tables
function movieByReviews(movieId){
    return knex("reviews as r") 
        .join("critics as c", "c.critic_id", "r.critic_id") 
        .select("r.*", "c.*") 
        .where({ "r.movie_id": movieId }) 
        .orderBy("r.review_id")
        .then(reviews => reviews.map(review => addCritic(review)));
}


module.exports = {
    list,
    listShowing,
    read,
    movieByTheaters,
    movieByReviews,
}