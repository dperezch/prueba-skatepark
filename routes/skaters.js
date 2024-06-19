import { Router } from "express";
import { SkaterModel } from "../models/skater.js";

const router = Router();

router.put("/", async (req, res) => {
  try {
    const data = req.body;
    // Analiza si estado viene vacío y lo define falso
    if (!data.estado) {
      data.estado = false;
    }

    const result = await SkaterModel.updateSkater(data);

    console.log("RESULT", result);
    res.json({
      message: "Updated skater",
      skater: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.error(error);
  }
});

router.put("/status", async (req, res) => {
  try {
    const data = req.body;
    const result = await SkaterModel.updateSkaterStatus(data);

    res.json({
      message: `Updater user status`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.error(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const data = req.query;
    const result = await SkaterModel.deleteStaker(data);

    res.json({
      message: `Deleted user with mail ${data.email}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.error(error);
  }
});

export { router };
