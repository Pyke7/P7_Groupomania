const express = require('express');
const router = express.Router();

const password = require('../middleware/password');
const limiter = require('../middleware/express-rate-limit');
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', password, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);
router.get('/', auth, userCtrl.getUser);
router.delete('/', auth, userCtrl.deleteAccount);

module.exports = router;