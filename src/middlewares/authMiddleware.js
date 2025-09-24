import jwt from "jsonwebtoken";

const SECRET_KEY = "mi_clave_super_secreta"; // usa una env var en prod

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Falta el header Authorization" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" });
    }
    req.user = user; // guardamos la info en la request
    next();
  });
}
