const express = require('express');
const mainRouter = express.Router();
const authRouter = require('./authRouter');
const notesRouter = require('./notesRouter');

mainRouter.use('/auth', authRouter);
mainRouter.use('/users', authRouter);
mainRouter.use('/notes', notesRouter);


/**
* @swagger
* /api/ping:
*   get:
*     summary: Ping endpoint
*     responses:
*       200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: pong
*/
mainRouter.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
  });
});

module.exports = mainRouter;
