if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");


const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const app = express();

//Enable cross-origin resource sharing
app.use(cors());

//Parse json and add to request
app.use(express.json());


app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

//Request not found
app.use(notFound);

//Error handler
app.use(errorHandler);

module.exports = app;








module.exports = app;
