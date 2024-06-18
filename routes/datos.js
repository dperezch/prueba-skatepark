import { Router } from "express";
import { Authorization } from "../middlewares/Authorization.js";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", Authorization, (req, res) => {
  const { token } = req.query;
  const data = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log("desde datos", decoded);
  });
  res.render("registro");
});

export { router };
