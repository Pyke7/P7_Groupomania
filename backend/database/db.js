const mysql = require('mysql2');

const connection = mysql.createConnection({
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
});

connection.connect((err) => {
    if (err) {
        console.log(err)
       return console.log('MySQL connection failed')
    }
    console.log('Successful connection to MySQL ')
});

module.exports = connection