const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function list() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const [rows] = await connection.execute('SELECT id, name, email, role FROM users');
        console.log('Usuários encontrados:', rows);
        await connection.end();
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
list();
