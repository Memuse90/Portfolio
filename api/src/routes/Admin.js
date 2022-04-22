const {Router} = require ('express');
const {register, logIn, renovateToken} = require ('../controllers/Admin')

const router = Router();

router.post('/register', register);
router.post('/login', logIn);
router.post('/refresh_token', renovateToken);


module.exports = router;