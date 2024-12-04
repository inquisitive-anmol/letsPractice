var express = require('express');
const { createUserValidator } = require('../validators/userValidator');
var router = express.Router();
const validateRequest = require('../middleware/validate');

/* GET users listing. */
router.get('/', createUserValidator, validateRequest, function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
