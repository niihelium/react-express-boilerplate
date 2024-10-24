const express = require('express');
const mainRouter = express.Router();
const authRouter = require('./authRouter');
const notesRouter = require('./notesRouter');

mainRouter.use('/auth', authRouter);
mainRouter.use('/users', authRouter);
mainRouter.use('/notes', notesRouter);

mainRouter.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
  });
});

module.exports = mainRouter;
