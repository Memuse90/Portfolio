const {Router} = require ('express');
const {getProjects, postProject} = require ('../controllers/Projects')

const router = Router();

router.get('/projects', getProjects);
router.post('/create', postProject);

module.exports = router;