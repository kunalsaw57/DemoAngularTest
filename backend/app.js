const express = require('express')
const cors = require('cors')
const mysqlconnection = require('./dbops')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/getData', (req, res) => {
   const selectQuery = 'SELECT * FROM userdata';
   mysqlconnection.conn.query(selectQuery, (err, results) => {
       if (err) {
           console.error('Error executing MySQL query:', err);
           res.status(500).json({ error: 'Internal Server Error' });
           return;
       }
       console.log('Data retrieved successfully');
       res.status(200).json(results);
   });
});

app.post('/addUser', (req, res) => {
   const { firstname, lastname, email, password } = req.body;
   const insertQuery = 'INSERT INTO userdata (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
   mysqlconnection.conn.query(insertQuery, [firstname, lastname, email, password], (err, results) => {
       if (err) {
           console.error('Error executing MySQL query:', err);
           res.status(500).json({ error: 'Internal Server Error' });
           return;
       }
       console.log('Data inserted successfully');
       res.status(200).json({ message: 'Data inserted successfully' });
   });
});

app.post('/loginUser', (req, res) => {
    const { email, password } = req.body;
    const selectQuery = 'SELECT * FROM userdata WHERE email = ? AND password = ?';
    mysqlconnection.conn.query(selectQuery, [email, password], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.json({ error: 'Invalid credentials' })
        } else {
            const user = results[0];
            res.send({ message: 'Login successful', user })
        }
    });
});

app.delete('/deleteUser', (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ error: 'Email is required for deletion' });
        return;
    }
    const deleteQuery = 'DELETE FROM userdata WHERE email = ?';
    mysqlconnection.conn.query(deleteQuery, [email], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json({ message: 'User deleted successfully' });
        }
    });
});


app.listen(8000, () => {
   console.log(`server is running in port no 8000`)
})