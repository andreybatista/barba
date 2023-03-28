import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

function createUsersTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT(11) NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    )
  `;

  connection.query(sql, (err) => {
    if (err) throw err;
    console.log('Users table created');
  });
}

export { connection, createUsersTable };
