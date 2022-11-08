const { Pool } = require("pg");

const pool = new Pool({
user: "postgres",
host: "localhost",
password: "xxxxx",
port: 5432,
database: "softlife",
});

const usuario = async (datos) => {
    const consulta = {
    text: `INSERT INTO usuarios (email, password) values($1, $2) RETURNING *`,
    values: datos,
    };
    try {
    const result = await pool.query(consulta);
    console.info(result.rows);
    return result;
    } catch (error) {
    console.error(error);
    return error;
    }
    };

const login = async (datos) => {
    try {
    const result = await pool.query(`SELECT (email, password) FROM usuarios where email = '${datos[0]}' AND password = '${datos[1]}'`);
    console.info(result);
    return result.rows;
    } catch (error) {
    console.error(error);
    return error;
    }
    };

const usuarios = async () => {
    try {
        const result = await pool.query(`SELECT * FROM usuarios`);
        console.info("filas: ", result.rowCount)
        return result.rows;
        } catch (error) {
        console.error(error);
        return error;
    }
    };

module.exports = { usuario, login, usuarios};
