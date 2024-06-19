
import { Router } from "express";
import { SkaterModel } from "../models/skater.js";

const router = Router()

router.put('/', async (req, res) => {
    const payload = req.body
    console.log("payload desde datos put", payload);
    try {
        const actualizarSkater = await SkaterModel.updateSkater(payload)
        res.status(200).json({
            message: "Skater actualizado",
            skater: actualizarSkater,
        })
    } catch (error) {
        console.log("hubo un error: " + error);
        res.status(500).json({ message: "Error del servidor" });
    }
})

router.delete('/', async (req, res) => {
    const { email } = req.body
    try {
        const skaterEliminado = await SkaterModel.deleteSkater(email)
        res.status(200).json({
            message: "Skater eliminado",
        })
    } catch (error) {
        console.log("hubo un error: " + error);
        res.status(500).json({ message: "Error del servidor" });
    }
})

export { router };