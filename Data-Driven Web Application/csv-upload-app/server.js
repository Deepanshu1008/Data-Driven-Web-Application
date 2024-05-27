// server.js
const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('./models/database');

const app = express();
const port = 3000;

app.use(fileUpload());

// Endpoint to upload a CSV file
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const csvFile = req.files.csvFile;
    const fileName = csvFile.name;
    const fileData = csvFile.data.toString('utf8');

    const query = 'INSERT INTO uploaded_data (name, data) VALUES (?, ?)';
    mysql.query(query, [fileName, fileData], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            return res.status(500).send('Error inserting data into the database.');
        }
        res.send('File uploaded and data inserted into the database successfully.');
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
