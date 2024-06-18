import { Router } from "express";
import path from "node:path";
import { SkaterModel } from "../models/skater.js";
import jwt from "jsonwebtoken";

const router = Router();

/* Ruta de la carpeta para guardar las fotos */
const rutaFotos = path.join(import.meta.dirname, "../photos");

router.get("/", (req, res) => {
  res.render("registro");
});

router.post("/", async (req, res) => {
  const payload = req.body;
  const archivo = req.files.foto;
  const nombreArchivo = payload.nombre.split(" ").join("") + ".jpg";

  const nuevoSkater = {
    email: payload.email,
    nombre: payload.nombre,
    password: payload.password,
    experiencia: payload.experiencia,
    especialidad: payload.especialidad,
    foto: `/photos/${nombreArchivo}`,
  };


  try {
    /* Validación para ver si el email ya existe */
    const skater = await SkaterModel.skaterExiste(nuevoSkater.email)
    if (skater) {
      res.status(400).json({ message: "El usuario ya existe" });
    }
    /* Agregar skater */
    const agregarSkater = await SkaterModel.addSkater(nuevoSkater);
    const token = jwt.sign({
      email: agregarSkater.email,
      nombre: agregarSkater.nombre,
      experiencia: agregarSkater.experiencia,
      especialidad: agregarSkater.especialidad,
    }, process.env.JWT_SECRET, { expiresIn: "1h" })
    await archivo.mv(rutaFotos + "/" + nombreArchivo);
    res.status(201).json({
      message: token
    });
  } catch (error) {
    console.log("hubo un error: " + error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

export { router };
