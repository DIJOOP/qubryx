const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth');
const {
	userLogin,
	userLogout,
	getUserDetail,
	registerUser
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', userLogin);
router.get('/logout', isAuthenticatedUser, userLogout);
router.get('/loadme', isAuthenticatedUser, getUserDetail);

module.exports = router;
