// server/db.js
const mysql = require('mysql');

// Konfigurasi koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Sesuaikan dengan user MySQL Anda
  password: '', // Sesuaikan dengan password MySQL Anda
  database: 'absensi_db'
});

// Fungsi untuk menghubungkan ke database
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Terhubung ke database MySQL');
});

module.exports = db;
