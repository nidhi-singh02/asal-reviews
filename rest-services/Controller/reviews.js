const appLogger = require('../Services/appLogger'),
    database = require('../Services/dbconnect'),
    validator = require('../Utils/validator'),
    reviewModel = require('../Models/review')
    //invoke = require('../invoke'),
    //query = require('../query'),
    channelID = "review",
    chaincodeID = "review"


module.exports.createReview = async(req,res)=>{
    try {
        console.log("######## Inside Create Review #########")
        req.checkBody('rating','Please provide Rating').notEmpty()
        req.checkBody('content', 'Please enter your Content').notEmpty()
        req.checkBody('UserId', 'UserId is required').notEmpty()
        req.checkBody('serviceprovider','serviceprovider is required').notEmpty()
        req.checkBody('productName','Product Name is required').notEmpty()
        let validationResult = await validator(req)
        if (!validationResult.status) {
            res.status(422).json({ status: 422, message: "Please enter correct data", error: validationResult.data })
            return
        }
        const timeStamp = Date.now(); 
        req.body.createdTs = timeStamp.toString();
	    req.body.updateTs = timeStamp.toString() ;

        let id = req.body.UserId + makeid(5)
        console.log(id,"MAKEID")

        const reviewId = parseInt(id)
        let obj = req.body
        obj.reviewId = reviewId
        let reviewObj = new reviewModel(obj)
        await reviewObj.save()
        return res.status(200).send({
            status: 200,
            message: "Review Saved Successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 500, message: error.message, data: error.data })
    }
}

module.exports.getReviews = async(req,res)=>{
    try {
        console.log("######## Inside  GetReview #########")
        let {
            rating,
            serviceprovider,
            UserId
        } = req.body
        let result
        if(rating){
             result = await reviewModel.find({
                rating:rating
            })
        }
        if(serviceprovider){
            result = await reviewModel.find({
                serviceprovider:serviceprovider
            })
        }
        if(UserId){
            result = await reviewModel.find({
                UserId:UserId
            })
        }
        res.send({
            status: 200,
            message: "success",
            result
        })
       

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 500, message: error.message, data: error.data })
    }
}

function makeid(length) {
    var result = ''
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}







