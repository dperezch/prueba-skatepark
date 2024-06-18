import { Router } from "express";
import { Usuario } from "../models/usuario.js";

const router = Router();

router.get("/", async (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  //console.log(email, password);
  const usuario = new Usuario(email, password);
  const datosValidos = await usuario.validarDatos();
  if (datosValidos) {
    res.redirect(`/datos?token=${datosValidos}`);
  } else {
    res.redirect("/home");
  }
});

export { router };
