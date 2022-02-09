const jwt = require('jsonwebtoken');

const auth = (req,role) => {
    const token = req.header('Authorization').replace('Bearer: ', '');
    if (!token) 
        throw new Error('Access denied. No token provided.');
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(decoded.user_role !== role)
            throw new Error('Unauthorized access.');
        return decoded.username;
    } catch (e) {
        throw new Error('Invalid token.');
    }
}

module.exports = auth;

