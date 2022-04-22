const Admin = require('../models/Admin.model');
const {hash, compare} = require('bcrypt');
const {createAccessToken, 
    createRefreshToken, 
    sendAccessToken,
    sendRefreshToken,
} = require('../Auth/TokenGenerator');

const { verify } = require('jsonwebtoken');

const register = async (req, res, next) => {
    const {username, password} = req.body;
    ;
    try{
        const admin = await Admin.findOne({username});

        const hashedPass= await hash(password, 10); 
        
        if(admin){
            res.json({msg: 'The username is already in use. Try another one.'})
        }

        const newAdmin = new Admin({
            username: username,
            password:hashedPass
        });

        await newAdmin.save()

        res.json({msg: 'The new admin was successfully created.'})

        
    }catch (e){
        next(e)
    }
}
const logIn = async (req, res, next) => {
    const {
        username,
        password
    } = req.body;

    try{
        const admin = await Admin.findOne({username});

        if (!admin){
            res.sendStatus(404).json({msg: 'This username does not exist.'})
        }

        const valid = await compare(password, admin.password);

        if (!valid) return res.sendStatus(401).json({error: 'The password is not correct.'}); 

        const accessToken = createAccessToken(admin._id);
        const refreshToken = createRefreshToken(admin._id);
        // Pongo el refreshToken en la DB
        await Admin.updateOne({username: username}, {refreshToken: refreshToken})
        // Envío el refreshToken como una cookie y el accessToken como una response al client
        sendRefreshToken(res, refreshToken);
        sendAccessToken(req, res, accessToken);

    }catch(e){
        next(e)
    }

}
const renovateToken = async (req, res, next) => {
    const token = req.cookies.refreshToken;
    console.log(token);
    if(!token) return res.send({accessToken: ''});

    let payload = null; 
    try{
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (e){
        return res.send({accessToken: ''});
    }

    const admin = await Admin.findById({_id: payload.adminId});

    if (!admin) return res.send({accessToken: ''});

    if (admin.refreshToken !== token){
          return res.send({accessToken: ''})
    }

    const accessToken = createAccessToken(admin._id);
    const refreshToken = createRefreshToken(admin._id);
    // Pongo el refreshToken en la DB
    await Admin.updateOne({_id: admin._id}, {refreshToken: refreshToken})
    // Envío el refreshToken como una cookie y el accessToken como una response al client
    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken);
}

module.exports = {
    register,
    logIn,
    renovateToken
}