const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function migrate() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('Verificando tabela users...');
        const [columns] = await connection.query("SHOW COLUMNS FROM users LIKE 'avatar'");
        
        if (columns.length === 0) {
            console.log('Adicionando coluna avatar...');
            await connection.query("ALTER TABLE users ADD COLUMN avatar VARCHAR(255) DEFAULT '/images/default-avatar.png'");
            console.log('Coluna adicionada com sucesso!');
        } else {
            console.log('Coluna avatar já existe.');
        }

        await connection.end();
        process.exit(0);
    } catch (err) {
        console.error('Erro na migração:', err);
        process.exit(1);
    }
}

migrate();
