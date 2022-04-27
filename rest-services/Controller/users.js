const appLogger = require("../Services/appLogger"),
  database = require("../Services/dbconnect"),
  { nanoid } = require("nanoid"),
  isEmpty = require("is-empty"),
  validator = require("../Utils/validator"),
  userModel = require("../Models/user"),
  jwt = require("jsonwebtoken"),
  { Password } = require("../Services/password");

module.exports.signup = async (req, res) => {
  try {
    console.log("######## Inside  signup #########");
    req.checkBody("name", "Name must be given").notEmpty();
    req.checkBody("email", "Email must be valid").notEmpty().isEmail();
    req
      .checkBody("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("You must supply a password");
    req
      .checkBody("contactNo")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Contact No should be of 10 digits");
    let validationResult = await validator(req);
    if (!validationResult.status) {
      res.status(422).json({
        status: 422,
        message: "Please enter correct data",
        error: validationResult.data,
      });
      return;
    }
    const { name, contactNo, email, password } = req.body;
    const existingUser = userModel.findOne({ Email: email });
    if (existingUser) {
      throw new Error("Email in use");
    }
    const user = new userModel({
      UserId: nanoid(),
      UserName: name,
      Email: email,
      Hashed_Password: password,
      PhoneNo: contactNo,
      Role: 1,
    });
    await user.save();
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.UserId,
        email: user.Email,
      },
      process.env.JWT_KEY
    );
    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send({
      status: 200,
      message: "success",
      user: { id: user.UserId, email },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ status: 500, message: error.message, data: error.data });
  }
};

module.exports.signin = async (req, res) => {
  try {
    console.log("######## Inside  signin #########");
    req.checkBody("email", "Email must be valid").notEmpty().isEmail();
    req
      .checkBody("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password");
    let validationResult = await validator(req);
    if (!validationResult.status) {
      res.status(422).json({
        status: 422,
        message: "Please enter correct data",
        error: validationResult.data,
      });
      return;
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ Email: email });
    if (isEmpty(user)) {
      throw new Error("Invalid Credentials");
    }
    const { UserId, Hashed_Password } = user;
    // Compare passwords
    const passwordMatch = await Password.compare(Hashed_Password, password);
    if (!passwordMatch) {
      throw new Error("Invalid Credentials");
    }
    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: UserId,
        email,
      },
      process.env.JWT_KEY
    );
    // Store it on session object
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send({
      status: 200,
      message: "success",
      user: { id: UserId, email },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ status: 500, message: error.message, data: error.data });
  }
};

module.exports.signout = async (req, res) => {
  try {
    req.session = null;
    res.send({});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ status: 500, message: error.message, data: error.data });
  }
};
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
