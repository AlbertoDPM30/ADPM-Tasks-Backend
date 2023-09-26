import User from "../models/user.model.js";
import { createAccessToken } from "../libs/jwt.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ username });
    if (userFound) return res.status(400).json(["El usuario ya existe"]);

    const emailFound = await User.findOne({ email });
    if (emailFound) return res.status(400).json(["El email ya existe"]);

    const passwordHash = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);

    await res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });

    console.log("Se está registrando");
  } catch (error) {
    res.status(500).json({ mensaje: error });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await User.findOne({ username });
    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(["Contraseña no coincide"]);

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);

    await res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });

    console.log("Se está registrando");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ Mensaje: "Usuario no encontrado" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    craetedAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json(["No autorizado"]);

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json(["No autorizado"]);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json(["No autorizado"]);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
