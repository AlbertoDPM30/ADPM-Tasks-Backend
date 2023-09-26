import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ Mensaje: "Token invalido, Acceso denegado" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ mensaje: "token invalido" });

    req.user = user;
    next();
  });
};
