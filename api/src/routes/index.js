const {Router} = require ('express');
const ProjectsRoutes = require ('./Projects');
const AdminRoutes = require ('./Admin')
const router = Router();

router.use('/projects', ProjectsRoutes);
router.use('/admin', AdminRoutes); 

module.exports = router;