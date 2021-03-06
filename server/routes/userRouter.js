const express = require('express');
const userRouter = express.Router();
const verificationController = require('../controllers/verificationController');
const eventController = require('../controllers/eventController.js');

userRouter.get('/', (req, res) => {
  return res.status(200).json('userRouter');
});

userRouter.post('/signup', verificationController.createUser, (req, res) => {
  return res
    .status(200)
    .json({ username: res.locals.username, name: res.locals.name });
});

userRouter.post(
  '/login',
  verificationController.verifyUser,
  // eventController.getUserEvents,
  eventController.getParticipatingEvents,
  (req, res) => {
    return res.status(200).json({
      username: res.locals.username,
      name: res.locals.name,
      events: res.locals.allEvents,
    });
    // {username: res.locals.username, events: res.locals.allEvents}
  }
);

module.exports = userRouter;
