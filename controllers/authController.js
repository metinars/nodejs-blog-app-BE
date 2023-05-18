const User = require('../models/users');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

SECRET_TOKEN = 'token';

const maxAge = 60 * 60 * 24;
const createToken = (id) => {
    return jwt.sign({ id }, 'gizli kelime', { expiresIn: maxAge });
};

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

        // const userToken = jwt.sign({ id: newUser.id }, SECRET_TOKEN, { expiresIn: '1h' });

        res.status(201).json({
            status: 'OK',
            newUser,
            // userToken
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(500).json({ message: 'Kullanıcı bulunamadı!' });
        }
        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            return res.status(500).json({ message: 'Parolanız yanlış!' });
        } else {
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            console.log('giriş başarılı');
            res.status(201).json({
                status: 'OK',
                user,
                token
            })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    register,
    login
}