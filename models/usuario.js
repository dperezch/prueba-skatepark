import pkg from "pg";
import { config } from "../db/config.js";
import jwt from "jsonwebtoken";

const { Pool } = pkg;
const pool = new Pool(config);

class Usuario {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  //REGISTRO: Validar si el usuario ya existe, mediante el email
  async usuarioExiste() {
    const text = "SELECT * FROM skaters WHERE email = $1";
    const values = [this.email];
    const queryObject = {
      text,
      values,
    };
    try {
      const result = await pool.query(queryObject);
      return result.rows.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //LOGIN: Validar si el email y la constraseña son correctos
  async validarDatos() {
    const text = "SELECT * FROM skaters WHERE email = $1 AND password = $2";
    const values = [this.email, this.password];
    const queryObject = {
      text,
      values,
    };
    const secret = process.env.JWT_SECRET;
    try {
      const result = await pool.query(queryObject);
      if (result.rows.length > 0) {
        const payload = {
          email: result.rows[0].email,
          nombre: result.rows[0].nombre,
          password: result.rows[0].password,
          experiencia: result.rows[0].anos_experiencia,
          especialidad: result.rows[0].especialidad,
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: "1h",
        });
        return token;
      } else {
        throw new Error("Datos incorrectos");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { Usuario };
