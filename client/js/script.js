// File: client/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const formAbsen = document.getElementById('form-absen');
    const absensiData = document.getElementById('absensi-data');

    // Fungsi untuk memuat data absensi
    const loadAbsensi = async () => {
        const res = await fetch('http://localhost:5000/api/absensi');
        const data = await res.json();

        absensiData.innerHTML = '';

        // Menampilkan ID berdasarkan urutan
        data.forEach((absen, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td> <!-- Menampilkan index + 1 sebagai ID -->
                    <td>${absen.nama}</td>
                    <td>${new Date(absen.tanggal).toLocaleDateString()}</td>
                    <td><button onclick="hapusAbsen(${absen.id})">Hapus</button></td>
                </tr>
            `;
            absensiData.innerHTML += row;
        });
    };

    // Fungsi untuk menambah data absensi
    formAbsen.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nama = document.getElementById('nama').value;
        const tanggal = document.getElementById('tanggal').value;

        await fetch('http://localhost:5000/api/absensi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nama, tanggal })
        });

        formAbsen.reset();
        loadAbsensi(); // Reload data setelah menambah
    });

    // Fungsi untuk menghapus data absensi
    window.hapusAbsen = async (id) => {
        await fetch(`http://localhost:5000/api/absensi/${id}`, {
            method: 'DELETE'
        });
        loadAbsensi(); // Reload data setelah menghapus
    };

    // Muat data saat halaman dibuka
    loadAbsensi();
});
