const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });

    const token = generateToken(email);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(email);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyToken = async (req, res) => {

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token missing or invalid' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded', decoded)
        const user = await User.find({ email: decoded.email });
        res.status(200).json({ valid: true, user: user[0] });
    } catch (err) {
        res.status(401).json({ valid: false, message: 'Invalid token' });
    }

}
