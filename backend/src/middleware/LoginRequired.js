import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login Required, Token não fornecido'],
    });
  }
  const [, token] = authorization.split(' ');
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = decoded;
    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Token invalido, faça login novamente'],
    });
  }
};
