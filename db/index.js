//import { Pool } from "pg";
import pkg from 'pg';
const { Pool } = pkg;

const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
}

const pool = new Pool(config);

const getSkaters = async () => {
    try {
        const text = "SELECT * FROM skaters";
        const result = await pool.query(text);
        return result.rows;
    } catch (error) {
        console.log(error);
    }
}

export { getSkaters }