import { Router } from "express";
import { Authorization } from "../middlewares/Authorization.js";

const router = Router();

router.get("/", Authorization, async (req, res) => {
  const decoded = req.decoded
  console.log("decoded :" + decoded);
  res.render("datos", {
    skater: decoded
  });
});



export { router };
