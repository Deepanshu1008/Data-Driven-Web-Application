const express = require('express');
const router = express.Router();
const fs = require('fs');
const csv = require('csv-parser');
const db = require('../models/database');

// Handle CSV upload
router.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let csvFile = req.files.csvFile;
  let results = [];

  fs.createReadStream(csvFile.tempFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      results.forEach(row => {
        const query = 'INSERT INTO uploaded_data (email, name, credit_score, credit_lines, masked_phone_number) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [row.Email, row.Name, row.CreditScore, row.CreditLines, row.MaskedPhoneNumber], (err) => {
          if (err) throw err;
        });
      });
      res.send('CSV data uploaded and inserted into MySQL!');
    });
});

// Fetch data with pagination
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  db.query('SELECT COUNT(*) AS count FROM uploaded_data', (err, countResult) => {
    if (err) throw err;
    const total = countResult[0].count;
    const query = `SELECT * FROM uploaded_data LIMIT ${limit} OFFSET ${offset}`;
    db.query(query, (err, results) => {
      if (err) throw err;
      res.json({
        data: results,
        page: page,
        totalPages: Math.ceil(total / limit)
      });
    });
  });
});

// Calculate subscription price
router.post('/calculate', (req, res) => {
  const { creditScore, creditLines, basePrice, pricePerCreditLine, pricePerCreditScorePoint } = req.body;
  const subscriptionPrice = basePrice + (pricePerCreditLine * creditLines) + (pricePerCreditScorePoint * creditScore);
  res.json({ subscriptionPrice });
});

module.exports = router;
