const service = require("./reviews.service");

//Verify if the review exists and stores it
async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    next({ status: 404, message: `Review cannot be found.` });
  }

async function destory(req, res){
    await service.destory(res.locals.review.review_id);
    res.sendStatus(204);
}

//Creates new object and updates a specific review
async function update(req, res){
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id
    }
    await service.update(updatedReview);
    const dataCritic = await service.updateWithCritic(updatedReview.review_id);
    dataCritic.critic_id = dataCritic.critic.critic_id;
    res.json({data: dataCritic})
}



module.exports ={
    destory: [reviewExists, destory],
    update: [reviewExists, update]
}