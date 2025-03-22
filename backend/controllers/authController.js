const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/UserModel");
const SECRET_KEY = process.env.SECRET_KEY;

exports.register = async (req,res)=>{
    const { username,email, password,role } = req.body;
    const user = await User.findOne({ email }); 


    if(!user){
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username,email, password: hashedPassword,role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
      }
    }
    else
    {
    
      res.status(402).json({ message: 'User already registered' });
    }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};