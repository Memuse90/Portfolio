const Project = require('../models/Project.model');

const getProjects=  async(req, res, next) =>{
    try{
        const projects = await Project.find();
        res.json(projects);
    }catch (error){
        next(error);
    }
};


const postProject=  (req, res, next) => {
    const { title , position, videoUrl, imageUrl, description, technologies } = req.body;

    const project = new Project({
        title,
        position, 
        videoUrl,
        imageUrl,
        description,
        technologies
    });
    Project.findOne({title: title})
    .then(data => {
        if (data){
           return  res.send({msg: 'The project already exists'});
        } else {
            project.save()
            .then(data => {
                res.json(data);
            })
        }
    })
    .catch(err =>{
        next(error)
    })


}; 
const getProjectById = (req, res, next) => {
    const {id} = req.params;
    Project.findById(id)
    .then(p => {
        res.json(p)
    })
    .catch( error =>{
        next(error);
    })
}

const deleteProject = (req, res, next) => {
    const {id} = req.params;
    Project.remove({_id: id})
    .then(data => {
        res.json(data);
    })
    .catch(e =>{
        next(e);
    })
}
module.exports ={
    getProjects,
    postProject,
    getProjectById,
    deleteProject
}