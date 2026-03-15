const prisma = require('../_lib/db')
const { requireAuth } = require('../_lib/auth')

// GET /api/antrian/list_data
module.exports = requireAuth(async (req, res) => {
    try {
        const [ikgp, periodonsia, ipm, ikga, konservasi, prostodonsia, bedahmulut, ortodonsia, radiologi] =
            await Promise.all([1, 2, 3, 4, 5, 6, 7, 8, 9].map((klinik) =>
                prisma.tabelKunjugan.count({ where: { id_klinik: klinik, status: '0' } })
            ))

        const datapasien = await prisma.dataPasien.count()

        return res.status(200).json({
            event: {
                ikgp,
                PERIODONSIA: periodonsia,
                ipm,
                ikga,
                konservasi,
                prosotodonsia: prostodonsia,
                bedahmulut,
                ortodonsia,
                radiologi,
                pengunjung: ikgp + periodonsia + ipm + ikga + konservasi + prostodonsia + bedahmulut + ortodonsia + radiologi,
                datapasien,
            },
        })
    } catch (err) {
        console.error('[antrian/list_data]', err)
        return res.status(500).json({ message: 'Server error' })
    }
})
