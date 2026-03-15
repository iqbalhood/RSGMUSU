const prisma = require('../_lib/db')
const { requireAuth } = require('../_lib/auth')

// PUT /api/perawatan/:id
// DELETE /api/perawatan/:id
module.exports = requireAuth(async (req, res) => {
    const id = parseInt(req.query.id || '')
    if (isNaN(id)) return res.status(400).json({ message: 'ID tidak valid' })

    if (req.method === 'PUT') {
        const { element, diagnosa, perawatan, id_dokter, nama_dokter, icd10 } = req.body || {}
        const data = {}
        if (element !== undefined) data.element = element
        if (diagnosa !== undefined) data.diagnosa = diagnosa
        if (perawatan !== undefined) data.perawatan = perawatan
        if (id_dokter !== undefined) data.id_dokter = String(id_dokter)
        if (nama_dokter !== undefined) data.nama_dokter = nama_dokter
        if (icd10 !== undefined) data.icd10 = icd10
        await prisma.perawatan.update({ where: { id }, data })
        return res.status(200).json({ message: 'OK' })
    }

    if (req.method === 'DELETE') {
        await prisma.perawatan.delete({ where: { id } })
        return res.status(200).json({ message: 'Deleted' })
    }

    return res.status(405).json({ message: 'Method not allowed' })
})
