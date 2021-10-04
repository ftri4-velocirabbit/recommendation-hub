const express = require('express');
const controller = require('../controllers/controller.js');

const router = express.Router();

// router.get('/', 
//   controller.getUsers, 
//   (req, res) => {
//   res.status(200).json(res.locals.users);
// });

router.post('/login',
  controller.attemptLogin, 
  (req, res) => {
    res.sendStatus(200);
  });

//signUp - POST
router.post('/signup',
  controller.checkIfUserExists,
  controller.createUser,
  (req, res) => {
    res.sendStatus(200);
});


  //joinGroup - PUT
router.put('/addgroup',
  controller.joinGroup,
  (req, res) => {
    res.sendStatus(200);
});  
  
//rateMovie - POST
router.post('/ratemovie', 
  controller.rateMovie,
  (req, res) => {
    res.sendStatus(200);
});

//results - GET
router.get('/results', 
  controller.getUserGroup,
  controller.getDisplayData,
  (req, res) => {
    res.status(200).json(res.locals.displayData);
  });


module.exports = router;
// export default router;