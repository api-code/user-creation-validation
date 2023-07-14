//importing library to use
// const res = require("express/lib/response");
const userModel = require("../models/user");
// const async = require("hbs/lib/async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_Key = "NOTESAPI";

//all logic for signUp
const signup = async (req, res) => {
  //username, email,password variable are paasing as property in request body
  const { first_name, last_name, email, password } = req.body;
  try {
    //Existing user check
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    //Hashed Password - security purpose
    const HashedPassword = await bcrypt.hashSync(password, 10);

    //user creation
    const result = await userModel.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: HashedPassword,
    });

    //token generate
    const token = jwt.sign(
      { email: result.email, password: result.password, id: result._id },
      SECRET_Key
    );
    // res.status(201).json({ user: result, token: token });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something wrong" });
  }
};

//all logic for signIn
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "user not found" });
    }
    else{
    bcrypt.compare(password, existingUser.password)
    .then((match)=> {
      if (match) {
        // Passwords match, authentication successful
        console.log('Authentication successful');
        res.status(202).json({ message:'Authentication successful'});
      } else {
        // Passwords do not match, authentication failed
        // console.log('Authentication failed');
        res.status(203).json({ message:'Authentication failed'});
      }
    })
    .catch((error) => {
      // Handle any potential errors
      res.status(500).json({ message:'Error during authentication:', error });
      // console.error('Error during authentication:', error);
    });

  }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_Key
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something wrong" });
  }
};

//using exprots we can use this anywhere
module.exports = { signup, signin };
