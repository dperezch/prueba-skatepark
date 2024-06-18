import { Router } from "express";
import { SkaterModel } from "../models/skater.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const skaters = await SkaterModel.getSkaters();
    //console.log(skaters);
    res.render("home", {
      skaters: skaters,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

export { router };
