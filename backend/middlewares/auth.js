const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/constants');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизаци' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация!' });
  }
  req.user = payload;
  next();
};

module.exports = auth;
