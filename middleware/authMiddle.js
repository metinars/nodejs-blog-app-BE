const jwt = require('jsonwebtoken');

const authMiddle = async (req, res, next) => {
  try {
    console.log(req);
    const token = req.cookies;
    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log('test catch');
    console.log(error.message);
  }
};

module.exports = authMiddle;
