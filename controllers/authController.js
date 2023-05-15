const User = require('../models/users');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

SECRET_TOKEN = 'token';

const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const checkUser = await User.findOne({ username })

        if (checkUser) {
            return res.status(500).json({ message: 'Böyle bir kullanıcı adı kullanılmakta!' });
        }

        if (password.length < 6) {
            return res.status(500).json({ message: 'Parolanız 6 karakterden küçük olamaz!' })
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await User.create({ username, password: passwordHash })

        const userToken = jwt.sign({ id: newUser.id }, SECRET_TOKEN, { expiresIn: '1h' });

        res.status(201).json({
            status: 'OK',
            newUser,
            userToken
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const checkUsername = await User.findOne({ username });

        if (!checkUsername) {
            return res.status(500).json({ message: 'Kullanıcı bulunamadı!' });
        }
        const comparePassword = await bcrypt.compare(password, checkUsername.password)

        if (!comparePassword) {
            return res.status(500).json({ message: 'Parolanız yanlış!' });
        }

        res.status(201).json({
            status: 'OK',
            checkUsername
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

module.exports = {
    register,
    login
}