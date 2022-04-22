require('dotenv').config();
const server= require('./src/app.js');
const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/Portfolio',{useNewUrlParser: true}, (error) =>{
    if(!error){
        console.log('Success Connected');
    }
    else {
        console.log('Error conecting to database.');
    }
});

server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
});
