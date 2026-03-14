const prisma = require('../../_lib/db')
const { requireAuth } = require('../../_lib/auth')

// GET /api/pasien/:id  — id = numeric id
// PUT /api/pasien/:id
// DELETE /api/pasien/:id
module.exports = requireAuth(async (req, res) => {
    const id = parseInt(req.query.id || '')
    if (isNaN(id)) return res.status(400).json({ message: 'ID tidak valid' })

    if (req.method === 'GET') {
        const pasien = await prisma.dataPasien.findUnique({ where: { id } })
        if (!pasien) return res.status(404).json({ message: 'Pasien tidak ditemukan' })
        return res.status(200).json(pasien)
    }

    if (req.method === 'PUT') {
        const body = req.body || {}
        const data = {}
        const fields = ['no_rekam_medis', 'nama', 'tempat_lahir', 'jenis_kelamin', 'agama', 'alamat', 'rtrw',
            'kelurahan', 'kecamatan', 'kabupaten', 'propinsi', 'nomor_hp', 'kewarganegaraan', 'noktp',
            'pendidikan', 'pekerjaan', 'status_perkawinan', 'cara_bayar', 'tujuan_kunjungan_pertama',
            'alergi', 'catatan', 'tinggi_badan', 'berat_badan', 'golongan_darah']
        fields.forEach((f) => { if (body[f] !== undefined) data[f] = body[f] })
        if (body.tanggal_lahir) data.tanggal_lahir = new Date(body.tanggal_lahir)
        if (body.tgl_registrasi) data.tgl_registrasi = new Date(body.tgl_registrasi)
        if (body.tgl_pertama_masuk) data.tgl_pertama_masuk = new Date(body.tgl_pertama_masuk)
        await prisma.dataPasien.update({ where: { id }, data })
        return res.status(200).json({ message: 'OK' })
    }

    if (req.method === 'DELETE') {
        await prisma.dataPasien.delete({ where: { id } })
        return res.status(200).json({ message: 'Deleted' })
    }

    return res.status(405).json({ message: 'Method not allowed' })
})
