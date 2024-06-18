import { Router } from "express";
import { SkaterModel } from "../models/skater.js";
import jwt from "jsonwebtoken";


const router = Router();

router.get("/", async (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const skater = await SkaterModel.skaterExiste(email)
    if (!skater) {
      res.status(400).json({ message: "Usuario o contraseña inválidos" });
    }
    if (skater.password !== password) {
      res.status(400).json({ message: "Usuario o contraseña inválidos" });
    }
    console.log('skater desde login route: ', skater);

    const token = jwt.sign(skater, process.env.JWT_SECRET, {
      expiresIn: "1h"
    })

    console.log('desde login route: ' + token);

    res.status(200).json({
      message: token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

export { router };
