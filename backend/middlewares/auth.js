const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/AuthError');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.cookies.jwt
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
    req.user = payload;
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  next();
};

module.exports = auth;
