const mongoose= require('mongoose');

const ProjectSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    position:{
        type: String
    },
    videoUrl:{
        type: String
    },
    imageUrl:{ //Pero quiero poner más de una imagen, así que volveremos...
        type: String,
    },
    description: {
        type: String
    },
    technologies:{
        type: String
    },
})

module.exports = mongoose.model('Proyect', ProjectSchema);

