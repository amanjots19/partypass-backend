var express = require('express');
var router = express.Router();
var controller = require('../controllers/scheduler');

router.post('/BookPass',controller.sendInfo)
module.exports = router;
