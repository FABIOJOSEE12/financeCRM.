const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const readline = require('readline');

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function createAdmin() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('--- Criar Novo Administrador ---');
        
        rl.question('Nome: ', (name) => {
            rl.question('Email: ', (email) => {
                rl.question('Senha: ', async (password) => {
                    try {
                        // Check if user exists
                        const [existing] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
                        
                        if (existing.length > 0) {
                            console.log('Usuário já existe. Promovendo para Admin...');
                            await connection.execute('UPDATE users SET role = "admin" WHERE email = ?', [email]);
                        } else {
                            console.log('Criando novo usuário Admin...');
                            const hashedPassword = await bcrypt.hash(password, 10);
                            await connection.execute(
                                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, "admin")',
                                [name, email, hashedPassword]
                            );
                        }
                        
                        console.log('Sucesso! Usuário agora é Administrador.');
                    } catch (err) {
                        console.error('Erro:', err.message);
                    } finally {
                        await connection.end();
                        rl.close();
                        process.exit(0);
                    }
                });
            });
        });

    } catch (err) {
        console.error('Erro de conexão:', err);
        process.exit(1);
    }
}

createAdmin();
