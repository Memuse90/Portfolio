const Project = require('../models/Project.model');

const getProjects=  (req, res, next) =>{
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

    project.save()
    .then(data => {
        res.json(data);
    })
    .catch(err =>{
        next(error)
    })


}; 
const getProjectById = (req, res, next) => {
    
}
module.exports ={
    getProjects,
    postProject
}