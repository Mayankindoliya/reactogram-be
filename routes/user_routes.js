const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/user_controller')

router.post('/signup', (req, res, next) => {
  usersControllers.signUpUsers(req.body)
  .then((data) => {
    res.json({"message": "User Signed up successfully!"})
  })
  .catch((err) => {
    next(err)
  })
})

router.post('/login', (req, res, next) => {
  usersControllers.loginUsers(req.body)
  .then((data) => {
    res.json({"message": "User login Successful", data})
  })
  .catch((err) => {
    next(err)
  })
})

module.exports = router;