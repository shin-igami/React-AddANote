const express = require('express');
const router = express.Router();
const User = require('../models/Users')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "mohsinisagoodb$oy"

//create a new user without login     No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a validpassword').isLength({ min: 5 })
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  const { name, email, password } = req.body;
  const alreadyUser = await User.findOne({ email: email })
  if (alreadyUser) {
    return res.status(400).json(success,"Email Already Exists")
  }
  const salt = await bcrypt.genSalt(10)
  const secPass = await bcrypt.hash(password, salt);
  try {
    const user = new User({ name: name, email: email, password: secPass })
    await user.save();
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    success = true;
    res.json({success,authToken:authToken})
  } catch (error) {
    console.log(error.message)
    res.status(500).json("Internal server Error")
  }

})

// login users    No login required
router.post("/login", [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password Cant be empty').exists()
], async (req, res) => {
  const { email, password } = req.body;
  let success = false;
  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(400).json("Invalid Credintials")
    }
  const passwordCompare =await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    return res.status(400).json("Invalid Credintials")
  }
  const data = {
    user: {
      id: user.id
    }
  }
  const authToken = jwt.sign(data, JWT_SECRET)
  success = true
  res.json({success,authToken:authToken})
  } catch (error) {
    console.log(error.message)
    res.status(500).json("Internal server Error")
  }

})
//fetch user details   Login reqiuired

router.post("/getuser",fetchuser,async (req,res)=>{
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.json(user)
  } catch (error) {
    console.log(error.message)
    res.status(500).json("Internal server Error")
  }
})


module.exports = router;