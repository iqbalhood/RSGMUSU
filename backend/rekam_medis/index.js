const prisma = require('../_lib/db')
const { requireAuth } = require('../_lib/auth')

// GET  /api/rekam_medis          — get one RM or list
// POST /api/rekam_medis          — create/update RM
// PUT  /api/rekam_medis/vital    — save vital signs
// PUT  /api/rekam_medis/riwayat  — save medical history
// PUT  /api/rekam_medis/ekstra_oral      — save extra-oral
// PUT  /api/rekam_medis/jaringan_lunak   — save soft tissue
// GET/PUT /api/rekam_medis/odontograma   — get/save odontogram
module.exports = requireAuth(async (req, res) => {
    const { sub } = req.query // maps to path after /rekam_medis/

    // ---- Vital Signs ----
    if (sub === 'vital') {
        if (req.method === 'GET') {
            const rows = await prisma.rmTandaVital.findMany({ where: { id_kunjungan: req.query.id_kunjungan } })
            return res.status(200).json({ event: rows })
        }
        if (req.method === 'PUT') {
            const { id_kunjungan, id_antrian, id_pasien, ...rest } = req.body || {}
            const existing = await prisma.rmTandaVital.findFirst({ where: { id_kunjungan } })
            if (existing) {
                await prisma.rmTandaVital.update({ where: { id: existing.id }, data: rest })
            } else {
                await prisma.rmTandaVital.create({ data: { id_kunjungan, id_antrian: id_antrian || '', id_pasien: id_pasien || '', ...rest } })
            }
            return res.status(200).json({ message: 'OK' })
        }
    }

    // ---- Riwayat Penyakit ----
    if (sub === 'riwayat') {
        if (req.method === 'GET') {
            const rows = await prisma.rmRiwayatPenyakit.findMany({ where: { id_kunjungan: req.query.id_kunjungan } })
            return res.status(200).json({ event: rows })
        }
        if (req.method === 'PUT') {
            const { id_kunjungan, id_antrian, id_pasien, ...rest } = req.body || {}
            const existing = await prisma.rmRiwayatPenyakit.findFirst({ where: { id_kunjungan } })
            if (existing) {
                await prisma.rmRiwayatPenyakit.update({ where: { id: existing.id }, data: rest })
            } else {
                await prisma.rmRiwayatPenyakit.create({ data: { id_kunjungan, id_antrian: id_antrian || '', id_pasien: id_pasien || '', status_jantung: 0, keterangan_jantung: '', status_hipertensi: 0, keterangan_hipertensi: '', status_diabetes: 0, keterangan_diabetes: '', status_alergi: 0, keterangan_alergi: '', status_asma: 0, keterangan_asma: '', status_hepar: 0, keterangan_hepar: '', status_lambung: 0, keterangan_lambung: '', status_lain: 0, keterangan_lain: '', ...rest } })
            }
            return res.status(200).json({ message: 'OK' })
        }
    }

    // ---- Odontogram ----
    if (sub === 'odontograma') {
        if (req.method === 'GET') {
            const row = await prisma.ondontograma.findFirst({ where: { id_kunjungan: req.query.id_kunjungan } })
            return res.status(200).json(row || {})
        }
        if (req.method === 'PUT') {
            const { id_kunjungan, id_antrian, id_pasien, keterangan } = req.body || {}
            const existing = await prisma.ondontograma.findFirst({ where: { id_kunjungan } })
            if (existing) {
                await prisma.ondontograma.update({ where: { id: existing.id }, data: { keterangan } })
            } else {
                await prisma.ondontograma.create({ data: { id_kunjungan, id_antrian: id_antrian || '', id_pasien: id_pasien || '', keterangan: keterangan || '' } })
            }
            return res.status(200).json({ message: 'OK' })
        }
    }

    // ---- Base: GET RM / POST RM ----
    if (!sub) {
        if (req.method === 'GET') {
            const { id_kunjungan, id_pasien } = req.query
            if (id_kunjungan) {
                const rm = await prisma.rekamMedis.findUnique({ where: { id_kunjungan } })
                return res.status(200).json({ event: rm ? [rm] : [] })
            }
            if (id_pasien) {
                const rows = await prisma.rekamMedis.findMany({ where: { id_pasien } })
                return res.status(200).json({ event: rows })
            }
            return res.status(400).json({ message: 'Provide id_kunjungan or id_pasien' })
        }

        if (req.method === 'POST') {
            const { idKunjungan, idAntrian, idPasien, idDokter, namaDokter, amnese, diagnosa, cicilan } = req.body || {}
            const existing = await prisma.rekamMedis.findUnique({ where: { id_kunjungan: idKunjungan } })
            if (existing) {
                await prisma.rekamMedis.update({ where: { id_kunjungan: idKunjungan }, data: { amnese: amnese || '', diagnosa: diagnosa || '' } })
            } else {
                await prisma.rekamMedis.create({ data: { id_kunjungan: idKunjungan, id_pasien: String(idPasien), id_dokter: String(idDokter), nama_dokter: namaDokter || '', amnese: amnese || '', diagnosa: diagnosa || '' } })
            }
            // Update kunjungan status
            await prisma.tabelKunjugan.updateMany({ where: { id_kunjungan: idKunjungan }, data: { status: '1', biaya_rekam_medis: cicilan || '0' } })
            return res.status(200).json({ message: 'OK' })
        }
    }

    return res.status(405).json({ message: 'Method not allowed' })
})
