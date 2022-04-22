const {Router} = require ('express');
const {register, logIn, renovateToken, logOut} = require ('../controllers/Admin')

const router = Router();

router.post('/register', register);
router.post('/login', logIn);
router.post('/refresh_token', renovateToken);
router.post('/logout', logOut)

module.exports = router;