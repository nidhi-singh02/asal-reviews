const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({

    reviewId: {
        type: Number
    },
    UserId: {
        type: Number,
    },
    content: {
        type: String,
    },
    productName: {
        type: String,
    },
    upvotes: {
        type: Number,
    },
    createdTs: {
        type: Date
    },
    updateTs: {
        type: Date
    },
    report: {
        type: String
    },
    rating: {
        type: Number
    },
    serviceprovider:{
        type: String
    }
})


module.exports = mongoose.model('reviewdetails', ReviewSchema)