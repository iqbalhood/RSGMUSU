const prisma = require('../_lib/db')
const { requireAuth } = require('../_lib/auth')

// GET /api/perawatan?id_pasien=&id_kunjungan=
// POST /api/perawatan
module.exports = requireAuth(async (req, res) => {
    if (req.method === 'GET') {
        const { id_pasien, id_kunjungan, id_antrian } = req.query || {}
        const where = {}
        if (id_pasien) where.id_pasien = String(id_pasien)
        if (id_kunjungan) where.id_antrian = String(id_kunjungan)
        if (id_antrian) where.id_antrian = String(id_antrian)
        const rows = await prisma.perawatan.findMany({ where, orderBy: { id: 'desc' } })
        return res.status(200).json({ event: rows })
    }

    if (req.method === 'POST') {
        const { id_pasien, id_antrian, id_klinik, element, diagnosa, perawatan, id_dokter, nama_dokter, icd10 } = req.body || {}
        const created = await prisma.perawatan.create({
            data: {
                id_pasien: String(id_pasien || ''),
                id_antrian: String(id_antrian || ''),
                id_klinik: String(id_klinik || ''),
                element: element || '',
                diagnosa: diagnosa || '',
                perawatan: perawatan || '',
                id_dokter: String(id_dokter || ''),
                nama_dokter: nama_dokter || '',
                icd10: icd10 || '',
            },
        })
        return res.status(201).json({ id: created.id })
    }

    return res.status(405).json({ message: 'Method not allowed' })
})
