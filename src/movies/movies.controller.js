const service = require("./movies.service");

//Lists the movies takes in a query of whether or not the movie is showing
async function list(req, res){
    if(req.query.is_showing) return listShowing(req, res);
    const data = await service.list();
    res.json({data});
}

async function listShowing(req, res){
    const data = await service.listShowing();
    res.json({data});
}

async function read(req, res){
    const data = res.locals.movie;
    res.json({data});
}

//Verifies if movie exists and stores it
async function movieExists(req, res, next){
    const {movieId} = req.params;
    const data = await service.read(movieId);
    if(data){
        res.locals.movie = data;
        return next();
    }
    next({ status: 404, message: `Movie not found` })
}

async function movieByTheaters(req, res) {
    const theaters = await service.movieByTheaters(res.locals.movie.movie_id);
    res.json({data: theaters});
}

async function movieByReviews(req, res) {
    const reviews = await service.movieByReviews(res.locals.movie.movie_id);
    res.json({data: reviews});
}



module.exports = {
    list,
    listShowing,
    read: [movieExists, read],
    movieByTheaters: [movieExists, movieByTheaters],
    movieByReviews: [movieExists, movieByReviews],
}