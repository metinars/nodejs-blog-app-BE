const jwt = require('jsonwebtoken');

SECRET_TOKEN = 'token';

const authMiddle = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1];
        let decodedData;

        if (toke) {
            decodedData = jwt.verify(token, SECRET_TOKEN)

            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = authMiddle