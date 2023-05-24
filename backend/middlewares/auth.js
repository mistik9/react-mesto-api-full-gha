const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/AuthError');
const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.cookies.jwt
  let payload;
  try {
    payload = jwt.verify(token,  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  next();
};

module.exports = auth;
