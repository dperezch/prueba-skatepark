import jwt from 'jsonwebtoken'

export const Authorization = async (req, res, next) => {
  const { token } = req.query
  console.log('desde middleware', token);
  if (!token) {
    return res.status(401).json({ error: "Token not provided" })
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = payload
    console.log("payload " + payload);
    next(); //pasar a la ruta correspondiente
  } catch (error) {
    res.status(401).json({
      html: "No autorizado",
    });
  }
};
