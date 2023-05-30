const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const checkUser = await User.findOne({ username });

    if (checkUser) {
      return res
        .status(500)
        .json({ message: 'Böyle bir kullanıcı adı kullanılmakta!' });
    }

    if (password.length < 6) {
      return res
        .status(500)
        .json({ message: 'Parolanız 6 karakterden küçük olamaz!' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await User.create({ username, password: passwordHash });

    res.status(201).json({
      status: 'OK',
      newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(500).json({ message: 'Kullanıcı bulunamadı!' });
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(500).json({ message: 'Parolanız yanlış!' });
    } else {
      const token = createToken(user._id);
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      console.log('giriş başarılı');

      res.status(201).json({
        statuss: 'OK',
        user,
        token,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.status(200).json({
      path: '/',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
};
