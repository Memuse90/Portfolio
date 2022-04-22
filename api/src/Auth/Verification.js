const {verify} = require ('jsonwebtoken');
const Admin = require ('../models/Admin.model');

const isAuth = (req, res, next)=> {
    const authorization = req.headers['authorization'];
   
   
    if (!authorization) throw new Error ('No estás loggeado');
// Le quito el bearer y me quedo con el token
    const token = authorization.split(' ')[1];
// nos aseguramos de que es un tken legítimo
    const {adminId} = verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    if(adminId){

        next()
    }
    //return  userId;
};

const isAuthAdmin = (req, res, next)=> {
    const authorization = req.headers['authorization'];
   
    if (!authorization) throw new Error ('No estás loggeado');
// Le quito el bearer y me quedo con el token
    const token = authorization.split(' ')[1];
// nos aseguramos de que es un tken legítimo
    const {adminId} = verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    return adminId;
    
};

module.exports = { //Esta se importa en el archivo de la ruta que quiero proteger
    isAuth,
    isAuthAdmin
}