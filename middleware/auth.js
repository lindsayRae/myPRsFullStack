

const jwt = require('jsonwebtoken');
//const config = require('config');

function auth(req, res, next){
    
    const token = req.header('x-auth-token');
    console.log(token);
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        // decoded payload
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = decoded;
        next();
    } catch (ex) {
        console.log(ex)
        res.status(400).send('Invalid token.');
    }

}

module.exports = auth;