import { db } from "../db/index.js";

const getSkaters = async () => {
    try {
        const text = "SELECT * FROM skaters";
        const result = await db.query(text);
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
        const result = await db.query(queryObject);
        return {
            email,
            nombre,
        };
    } catch (error) {
        console.log(error);
    }

};

const skaterExiste = async (email) => {
    const text = "SELECT * from skaters WHERE email = $1"
    const values = [email]
    const queryObject = {
        text,
        values
    }
    try {
        const result = await db.query(queryObject)
        const datos = {
            email: result.rows[0].email,
            nombre: result.rows[0].nombre,
            password: result.rows[0].password,
            experiencia: result.rows[0].anos_experiencia,
            especialidad: result.rows[0].especialidad,
        }
        return datos
    } catch (error) {
        console.log(error);
    }
}

export const SkaterModel = {
    getSkaters,
    addSkater,
    skaterExiste,
}