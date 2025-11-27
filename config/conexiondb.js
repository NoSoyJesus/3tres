import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'tienda_angeles',
    connectionLimit: 5
  });

  // test connection
  pool.getConnection()
  .then(connection => {
    console.log('Conexion exitosa a la DB')
    connection.release()
  })
  .catch(error => {
    console.log('Error DB: ', error)
  })
  
export default pool