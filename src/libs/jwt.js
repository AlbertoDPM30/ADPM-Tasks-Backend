import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export function createAccessToken(payload) {
  return new Promise((res, rej) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "365d" }, (err, token) => {
      if (err) rej(err);
      res(token);
    });
  });
}
