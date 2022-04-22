const {sign} = require('jsonwebtoken');

const createAccessToken = adminId => {
    return sign ({adminId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m'
    })
}; 

const createRefreshToken = adminId => {
    return sign ({adminId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    })
}; 

const sendAccessToken = (req, res, accessToken) => {
    res.send({
        accessToken
    })
};

const sendRefreshToken = (res, refreshToken) => {
  res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/admin/refresh_token',
     // secured: true

  })  
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}