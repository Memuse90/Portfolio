const {Router} = require ('express');
const {getProjects, postProject, getProjectById, deleteProject} = require ('../controllers/Projects')

const router = Router();

router.get('/projects', getProjects);
router.post('/create', postProject);
router.get('/project/:id', getProjectById);
router.delete('/delete/:id', deleteProject)

module.exports = router;