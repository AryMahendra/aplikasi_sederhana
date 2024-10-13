// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

// Inisialisasi aplikasi Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoint untuk mendapatkan data absensi
app.get('/api/absensi', (req, res) => {
  const query = 'SELECT * FROM absen ORDER BY id DESC';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
});

// API Endpoint untuk menambah data absensi
app.post('/api/absensi', (req, res) => {
  const { nama, tanggal } = req.body;
  const query = 'INSERT INTO absen (nama, tanggal) VALUES (?, ?)';
  db.query(query, [nama, tanggal], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({ id: result.insertId, nama, tanggal });
  });
});

// API Endpoint untuk menghapus data absensi berdasarkan ID
app.delete('/api/absensi/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM absen WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ message: 'Data absensi berhasil dihapus' });
  });
});

// Jalankan server di port 5000
app.listen(5000, () => {
  console.log('Server berjalan di port 5000');
});
