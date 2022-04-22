const {Router} = require ('express');
const { isAuth } = require('../Auth/Verification');
const {getProjects, postProject, getProjectById, deleteProject} = require ('../controllers/Projects')

const router = Router();

router.get('/', getProjects);
router.post('/create', isAuth, postProject);
router.get('/:id', getProjectById);
router.delete('/delete/:id', isAuth, deleteProject)

module.exports = router;