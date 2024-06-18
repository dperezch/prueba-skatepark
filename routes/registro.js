import { Router } from "express";
import path from "node:path";
import { addSkater } from "../db/index.js";

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
    const agregarSkater = await addSkater(nuevoSkater);
    await archivo.mv(rutaFotos + "/" + nombreArchivo);
    res.status(201).send(agregarSkater);
  } catch (error) {
    console.log("hubo un error: " + error);
    res.status(500).json({ message: "Error al agregar el skater" });
  }
});

export { router };
