/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { NOT_FOUND } = require('./utils/constants');
const {
  userRouter, cardRouter, signupRouter, signinRouter,
} = require('./routes/index');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const URL = 'mongodb://127.0.0.1:27017/mestodb';

const app = express();
app.use(express.json());

const allowedCors = [
  'https://mistik9mesto.nomoredomains.monster/',
  'https://api.mistik9mesto.nomoredomains.monster/',
  'localhost:3000'
];

app.use(function(req, res, next) {
  const { origin } = req.headers; 
      if (allowedCors.includes(origin)) {
      // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
      res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE"; 
  
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
      // разрешаем кросс-доменные запросы любых типов (по умолчанию) 
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  } 

  next();
}); 

mongoose.connect(URL)
  .then(console.log('DB is connected'))
  .catch((err) => console.log(err));

app.use('/signup', signupRouter);
app.use('/signin', signinRouter);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
