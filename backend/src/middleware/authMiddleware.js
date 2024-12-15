const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded.id;
      req.taskId = decoded.id;
      next();
    } catch (error) {
      res.status(400).json({ error: 'Token inv�lido' });
    }
  };
