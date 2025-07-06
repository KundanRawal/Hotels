const jwt = require('jsonwebtoken');

const jwtAuthMiddelware = (req, res, next) => {

    const authorization = req.headers.authorization
    if (!authorization/*.startsWith('Bearer ')*/) return res.status(401).json({ error: 'token not found' });

    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'unauthorizeed' })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'unauthorizeed' })
    }
}

function generateToken(userData) {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 3000 });
}

module.exports = { jwtAuthMiddelware, generateToken };
