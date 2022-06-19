const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");


//This function maps properties of the critics object and groups them together
const addCritic = mapProperties( {
    critic_id : "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created: "critic.created_at",
    updated: "critic.updated_at"
});

//Sql request with knex to retrieve data from the reviews table
function read(reviewId) {
    return knex("reviews as r")
        .where({ "review_id": reviewId })
        .first();
}

//Sql request with knex to retrieve data from the reviews table and deletes
function destory(reviewId){
    return knex("reviews")
        .where({ "review_id": reviewId })
        .del();
}

//Sql request with knex to retrieve data from the reviews table and updates
function update(updatedReview){
    return knex("reviews as r")
        .select("r.*")
        .where({ "r.review_id": updatedReview.review_id })
        .update(updatedReview, "*")
}

//Sql request with knex to retrieve data from the reviews and critics table
// and then adds the crtics in its own object
function updateWithCritic(review_id){
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("c.*", "c.created_at as created", "c.updated_at as updated")
        .select("r.*")
        .where({"r.review_id": review_id})
        .then(review => addCritic(review[0]))
}

module.exports = {
    read,
    destory,
    update,
    updateWithCritic,
}