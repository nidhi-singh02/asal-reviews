const express = require('express'),
    route = new express.Router(),
    reviewController = require('../Controller/reviews');

route.post('/user/createReview', reviewController.createReview)
route.post('/user/getReview', reviewController.getReviews)

module.exports = route
