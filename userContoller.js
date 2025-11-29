import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password} = req.body;

  if (!username || !email || !password ) {
    throw new Error("Fill all the input");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
   return res.status(400).json({
      message: "User already exit",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      createToken

    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new Error("Email dosenot exist");
  }

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        country: existingUser.country,
        createToken
      });
      return;
    }
  }
});

const logoutUser = asyncHandler(async(req,res)=>{

     res.cookie('jwt','',{maxAge:1})
 
      res.status(200).json({
     message:"user logout Succefully"
}
)

})

export { createUser, loginUser,logoutUser};
