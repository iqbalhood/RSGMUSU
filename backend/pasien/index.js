const prisma = require('../../_lib/db')
const { requireAuth } = require('../../_lib/auth')

// GET /api/pasien - list (paginated + search)
// POST /api/pasien - create
module.exports = requireAuth(async (req, res) => {
    if (req.method === 'GET') {
        const { search = '', page = '1', limit = '50' } = req.query || {}
        const skip = (parseInt(page) - 1) * parseInt(limit)
        const where = search
            ? {
                OR: [
                    { nama: { contains: search } },
                    { no_rekam_medis: { contains: search } },
                ],
            }
            : {}
        const [event, total] = await Promise.all([
            prisma.dataPasien.findMany({
                where,
                skip,
                take: parseInt(limit),
                orderBy: { id: 'desc' },
            }),
            prisma.dataPasien.count({ where }),
        ])
        return res.status(200).json({ event, total })
    }

    if (req.method === 'POST') {
        const body = req.body || {}
        const today = new Date()
        const data = {
            no_rekam_medis: body.no_rekam_medis || '',
            tgl_registrasi: body.tgl_registrasi ? new Date(body.tgl_registrasi) : today,
            nama: body.nama || '',
            tempat_lahir: body.tempat_lahir || '',
            tanggal_lahir: body.tanggal_lahir ? new Date(body.tanggal_lahir) : today,
            jenis_kelamin: body.jenis_kelamin || 'L',
            agama: body.agama || '',
            alamat: body.alamat || '',
            rtrw: body.rtrw || '',
            kelurahan: body.kelurahan || '',
            kecamatan: body.kecamatan || '',
            kabupaten: body.kabupaten || '',
            propinsi: body.propinsi || '',
            nomor_hp: body.nomor_hp || '',
            kewarganegaraan: body.kewarganegaraan || 'WNI',
            noktp: body.noktp || '',
            pendidikan: body.pendidikan || '',
            pekerjaan: body.pekerjaan || '',
            status_perkawinan: body.status_perkawinan || '',
            tgl_pertama_masuk: body.tgl_pertama_masuk ? new Date(body.tgl_pertama_masuk) : today,
            cara_bayar: body.cara_bayar || 'Umum',
            tujuan_kunjungan_pertama: body.tujuan_kunjungan_pertama || '',
            alergi: body.alergi || '',
            catatan: body.catatan || '',
            tinggi_badan: body.tinggi_badan || '',
            berat_badan: body.berat_badan || '',
            golongan_darah: body.golongan_darah || '',
        }
        const created = await prisma.dataPasien.create({ data })
        return res.status(201).json({ id: created.id })
    }

    return res.status(405).json({ message: 'Method not allowed' })
})
