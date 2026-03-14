const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper untuk membungkus module Vercel Serverless Function sebelumnya
function wrap(handler) {
    return async (req, res) => {
        try {
            // Gabungkan params ke query agar sesuai dengan cara Vercel serverless membaca [id].js
            req.query = { ...req.query, ...req.params };
            const fn = handler.default || handler;
            await fn(req, res);
        } catch (err) {
            console.error('API Error:', err);
            if (!res.headersSent) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };
}

// === ROUTES MAAPPING ===

app.all('/api/health', wrap(require('../backend/health')));
app.all('/api/auth/login', wrap(require('../backend/auth/login')));

app.all('/api/antrian/list_data', wrap(require('../backend/antrian/list_data')));
app.all('/api/apotek/list_data_obat', wrap(require('../backend/apotek/list_data_obat')));

// Dokter
app.all('/api/dokter', wrap(require('../backend/dokter/index')));
app.all('/api/dokter/:id', wrap(require('../backend/dokter/[id]')));

// Kasir
app.all('/api/kasir/cicilan', wrap(require('../backend/kasir/cicilan')));

// Kunjungan
app.all('/api/kunjungan', wrap(require('../backend/kunjungan/index')));
app.all('/api/kunjungan/kasir', wrap(require('../backend/kunjungan/kasir')));
app.all('/api/kunjungan/:id', wrap(require('../backend/kunjungan/[id]')));

// Laporan
app.all('/api/laporan', wrap(require('../backend/laporan/index')));
app.all('/api/laporan/export', wrap(require('../backend/laporan/export')));

// Layanan
app.all('/api/layanan', wrap(require('../backend/layanan/index')));
app.all('/api/layanan/kunjungan', wrap(require('../backend/layanan/kunjungan')));
app.all('/api/layanan/:id', wrap(require('../backend/layanan/[id]')));

// Obat
app.all('/api/obat', wrap(require('../backend/obat/index')));
app.all('/api/obat/kunjungan', wrap(require('../backend/obat/kunjungan')));
app.all('/api/obat/:id', wrap(require('../backend/obat/[id]')));

// Pasien
app.all('/api/pasien', wrap(require('../backend/pasien/index')));
app.all('/api/pasien/:id', wrap(require('../backend/pasien/[id]')));

// Perawatan
app.all('/api/perawatan', wrap(require('../backend/perawatan/index')));
app.all('/api/perawatan/:id', wrap(require('../backend/perawatan/[id]')));

// Rekam Medis
app.all('/api/rekam_medis', wrap(require('../backend/rekam_medis/index')));

// Search
app.all('/api/search', wrap(require('../backend/search/index')));

// Users
app.all('/api/users', wrap(require('../backend/users/index')));
app.all('/api/users/:id', wrap(require('../backend/users/[id]')));

app.all('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

module.exports = app;
