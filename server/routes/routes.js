const express = require('express');
const controller = require('../controllers/controller.js');

const router = express.Router();

router.get('/', 
  controller.getUsers, 
  (req, res) => {
  res.status(200).json(res.locals.users);
});

// router.post('signup', )
// router.post()

router.post('/login',
  controller.attemptLogin, 
  // controller.getDisplayData,
  (req, res) => {
    res.status(200).json(res.locals.user[0]); //modify to send display data instead of user data
  });

  //joinGroup - PUT/POST

  //signUp - POST
  
  //rateMovie - POST/PUT 




module.exports = router;
// export default router;