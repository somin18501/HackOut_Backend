const jwt = require('jsonwebtoken');


module.exports = function(req,res,next){
    const token = req.headers.token;
    if(!token) return res.status(401).send('Access Denited, You need to login or sign in.');

    try{
        const details = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = details;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');   
    }

}