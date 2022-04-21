const mongoose= require('mongoose');

var ProjectSchema = new mongoose.Schema({
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

mongoose.model('Proyect', ProjectSchema);

