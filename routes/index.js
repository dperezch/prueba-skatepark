import { Router } from "express";
import { getSkaters } from "../db/index.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const skaters = await getSkaters();
        console.log(skaters);
        res.render('home', {
            skaters: skaters,
            prueba: "hola"
        })
    } catch (error) {
        res.status(500).send(error);
    }
})

export { router }