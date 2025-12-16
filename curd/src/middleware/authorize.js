const { verifyToken } = require('../utils/jwt');

function authorize(roles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    try {
      const user = verifyToken(token);
      req.user = user;

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden: Access denied' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}

module.exports = authorize;
