const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/user.schema");
require("dotenv").config();


//Signup Authentication
const SignUp = async (req, res) => {
  const {username,email,role,password,streamId,subjectId} = req.body;
  try {
    // Checking if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(401).json({ msg: "User is already registered. Please try to login." });
    }
    const users=await UserModel.find();
        let id=1;
        if(users&&users.length>0){
          users.sort((a, b) => a.userID - b.userID)
             id=users[users.length-1].userID;
             id=id+1;
        }
    const userID=id;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserFields = {userID,username,email,role,password: hashedPassword,streamId,subjectId};
    if(role) {
      newUserFields.role = role;
    }
    const newUser = new UserModel(newUserFields);
    // Saving the new user
    await newUser.save();
    return res.status(201).json({ msg: "User registered successfully." });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      msg: "Failed to register user. Please provide correct details.",
    });
  }
};


//logIn Authentication
const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "user not found please provide correct credential" });
    }
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) throw new Error(err);
      if (result) {
        const token = jwt.sign(
          { email, role: user.role, userID: user.userID,username:user.username },process.env.SECRET_KEY,{ expiresIn: "1h" });
          res.status(200).json({ token ,role: user.role});
      } else {
        return res.status(401).json({ msg: "please provide correct credential" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Please provide correct details" });
  }
};


//LogOut Authentication
const logout = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  try {
      const blacklistToken = new Blacklist({ token });
      await blacklistToken.save();
      res.status(201).send("User logout successfully");
  } catch (error) {
      res.status(400).json({ msg: error.message });
  }
}


module.exports = { SignUp, logIn,logout };


