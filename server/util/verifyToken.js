const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY;

// Middleware para verificar el token de autenticación
const verifyToken = (req, res, next) => {
    const userToken = req.cookies.userToken;

    if (!userToken) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(userToken, secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        req.userId = decoded._id;
        next();
    });
};

module.exports = verifyToken;
