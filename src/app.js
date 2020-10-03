const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(express.json());

const morganOptions = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOptions));
app.use(cors());
app.use(helmet());

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/recipes', recipesRouter);

app.get('/', (req, res, next) => {
  res.send('Sending from app.js');
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.message, error };
  }
  console.error(error);
  res.status(500).json(response);
});

module.exports = app;
