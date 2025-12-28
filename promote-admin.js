const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function promote() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        
        // Promovendo o primeiro usuário encontrado (Fábio)
        const email = 'sr.fabioqueiroz@gmail.com';
        
        await connection.execute('UPDATE users SET role = "admin" WHERE email = ?', [email]);
        console.log(`Usuário ${email} promovido a ADMIN com sucesso!`);
        
        await connection.end();
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
promote();
