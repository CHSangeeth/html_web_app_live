require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function setupDatabase() {
    console.log('Setting up database...');
    
    // Read SQL file
    const sqlFile = fs.readFileSync(path.join(__dirname, 'database_setup.sql'), 'utf8');
    const sqlStatements = sqlFile.split(';').filter(statement => statement.trim() !== '');
    
    try {
        // Create connection without database selection first
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            multipleStatements: true
        });
        
        console.log('Connected to MySQL server');
        
        // Execute each SQL statement
        for (const statement of sqlStatements) {
            if (statement.trim()) {
                await connection.query(statement);
                console.log('Executed:', statement.substring(0, 50) + '...');
            }
        }
        
        console.log('Database setup completed successfully');
        await connection.end();
        
    } catch (error) {
        console.error('Error setting up database:', error);
        process.exit(1);
    }
}

setupDatabase();