const mysql =require('mysql2')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'student'
};

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports.conn = connection