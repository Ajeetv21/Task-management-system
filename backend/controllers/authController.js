const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/UserModel");
const SECRET_KEY = process.env.SECRET_KEY;

exports.register = async (req,res)=>{
    const { username,email, password } = req.body;
    const user = await User.findOne({ email }); 


    if(!user){
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username,email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
      }
    }
    else
    {
      console.log("already user registered")
    }
}

exports.login = async (req,res)=>{
    const { email, password } = req.body; 
    try {
      const user = await User.findOne({ email }); 
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '2h' });
      res.json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({ message: 'Error logging in', error: err.message });
    }
}