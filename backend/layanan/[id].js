const prisma = require('../_lib/db')
const { requireAuth } = require('../_lib/auth')

// PUT /api/layanan/:id   — update layanan line
// DELETE /api/layanan/:id — delete layanan line or master
module.exports = requireAuth(async (req, res) => {
    const id = parseInt(req.query.id || '')
    const { context } = req.query // context=kunjungan to target tabel_layanan_kunjungan

    if (isNaN(id)) return res.status(400).json({ message: 'ID tidak valid' })

    if (context === 'kunjungan') {
        if (req.method === 'PUT') {
            const { nama_layanan, harga_bahan, harga_layanan } = req.body || {}
            const data = {}
            if (nama_layanan !== undefined) data.nama_layanan = nama_layanan
            if (harga_bahan !== undefined) data.harga_bahan = String(harga_bahan)
            if (harga_layanan !== undefined) data.harga_layanan = String(harga_layanan)
            await prisma.tabelLayananKunjungan.update({ where: { id }, data })
            return res.status(200).json({ message: 'OK' })
        }
        if (req.method === 'DELETE') {
            await prisma.tabelLayananKunjungan.delete({ where: { id } })
            return res.status(200).json({ message: 'Deleted' })
        }
    }

    // Default: layanan master
    if (req.method === 'PUT') {
        const { layanan, bahan, harga_bahan, idklinik, harga_koas, harga_drg, harga_drgsp } = req.body || {}
        const data = {}
        if (layanan !== undefined) data.layanan = layanan
        if (bahan !== undefined) data.bahan = bahan
        if (harga_bahan !== undefined) data.harga_bahan = parseInt(harga_bahan) || 0
        if (idklinik !== undefined) data.idklinik = parseInt(idklinik) || 1
        if (harga_koas !== undefined) data.harga_koas = parseInt(harga_koas) || 0
        if (harga_drg !== undefined) data.harga_drg = parseInt(harga_drg) || 0
        if (harga_drgsp !== undefined) data.harga_drgsp = parseInt(harga_drgsp) || 0
        await prisma.dataLayanan.update({ where: { id }, data })
        return res.status(200).json({ message: 'OK' })
    }

    if (req.method === 'DELETE') {
        await prisma.dataLayanan.delete({ where: { id } })
        return res.status(200).json({ message: 'Deleted' })
    }

    return res.status(405).json({ message: 'Method not allowed' })
})
