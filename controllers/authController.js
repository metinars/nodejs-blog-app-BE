const User = require('../models/users');

const signup_post = async (req, res, next) => {
    const { userName, password } = req.body;

    const user = new User({
        username: userName,
        password: password
    });

    try {
        await user
            .save()
            .then((result) => {
                console.log('user post');
            }).catch((err) => console.log(err));
    } catch (err) {
        return next(err)
    }
    res.json(user);
};

module.exports = {
    signup_post
}