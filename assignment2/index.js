const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
require('dotenv').config();
const port = process.env.PORT;

app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database('./data.db');

// const isEmailExist = (email) => {

//     db.get('SELECT COUNT(email) as count FROM users WHERE email = ?', [email], (err, rows) => {
//         if (rows.count > 0) {
//             return false;
//         } else {
//             return true;
//         }
//     });
// }


// Create
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Invalid data. Please provide all required fields.' });
    }

    db.run('INSERT INTO users (username, email, password) VALUES (?, ?,?)', [username, email, password], function (err) {
        // fail 
        if (err) {
            return res.status(500).json({ success: false, message: 'Error storing user information.' });
        }
        // success 
        res.status(201).json({ success: true, message: 'User registration successful', userId: this.lastID });
    });
});

// Read
app.get('/register', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

// Update

// app.put('/register/:id', (req, res) => {
//     const { username,email,password } = req.body;
//     const id = req.params.id;
//     db.run('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, password, id], function (err) {
//         if (err) {
//             return res.status(500).send(err.message);
//         }
//         res.json({ rowsAffected: this.changes });
//     });
// });

// Delete

// app.delete('/register/:id', (req, res) => {
//     const id = req.params.id;
//     db.run('DELETE FROM users WHERE id = ?', id, function (err) {
//         if (err) {
//             return res.status(500).send(err.message);
//         }
//         res.json({ rowsAffected: this.changes });
//     });
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
