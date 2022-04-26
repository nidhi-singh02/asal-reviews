const appLogger = require("../Services/appLogger"),
  database = require("../Services/dbconnect"),
  validator = require("../Utils/validator"),
  userModel = require("../Models/user");

module.exports.getUser = async (req, res) => {
  try {
    console.log("######## Inside  getUser #########");
    let { id } = req.params;
    let user = {};
    user = await userModel.findOne({ UserId: id });
    res.send({
      status: 200,
      message: "success",
      user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ status: 500, message: error.message, data: error.data });
  }
};
