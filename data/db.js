//imposto le configurazioni di MySQL
const mysql = require('mysql2');

//creo un nuovo oggetto
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Provablog1234!',
    database: 'db_blog'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connesso a MySQL!')
});

module.exports = connection;