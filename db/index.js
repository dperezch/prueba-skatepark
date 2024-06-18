import pg from "pg";

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

const { Pool } = pg;

export const db = new Pool(config);

/* const getSkaters = async () => {
  try {
    const text = "SELECT * FROM skaters";
    const result = await pool.query(text);
    return result.rows;
  } catch (error) {
    console.log(error);
  }
};

const addSkater = async ({
  email,
  nombre,
  password,
  experiencia,
  especialidad,
  foto,
}) => {
  const usuario = new Usuario(email, password);
  const existe = await usuario.usuarioExiste();
  if (existe) {
    throw new Error("El usuario ya existe");
  } else {
    const text =
      "INSERT INTO skaters (email,nombre,password,anos_experiencia,especialidad,foto,estado) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
    const values = [
      email,
      nombre,
      password,
      experiencia,
      especialidad,
      foto,
      false,
    ];
    const queryObject = {
      text,
      values,
    };
    try {
      const result = await pool.query(queryObject);
      return {
        email,
        nombre,
      };
    } catch (error) {
      console.log(error);
    }
  }
}; */

/* const getSkater = async (email, password) => {
  const usuario = new Usuario(email, password);
  const datosValidos = await usuario.validarDatos();
  if (datosValidos) {
    const text = "SELECT * FROM skaters WHERE email = $1 AND password = $2";
    const values = [email, password];
    const queryObject = {
      text,
      values,
    };
    try {
      const result = await pool.query(queryObject);
      console.log(result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error("Datos incorrectos");
  }
}; */


