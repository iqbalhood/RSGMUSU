import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader2, Printer } from 'lucide-react'
import api from '@/lib/api'
import { formatDate, formatCurrency } from '@/lib/utils'
import Odontogram from '@/components/Odontogram'

const KLINIK = {
    1: 'IKGP', 2: 'Periodonsia', 3: 'IPM (Ilmu Penyakit Mulut)', 4: 'IKGA',
    5: 'Konservasi', 6: 'Prostodonsia', 7: 'Bedah Mulut', 8: 'Ortodonsia', 9: 'Radiologi',
}

const RIWAYAT_LABELS = {
    jantung: 'Jantung', hipertensi: 'Hipertensi', diabetes: 'Diabetes',
    alergi: 'Alergi', asma: 'Asma', hepar: 'Hepar', lambung: 'Lambung', lain: 'Lain-lain',
}

function PrintRow({ label, value }) {
    return (
        <div className="flex gap-2 py-0.5">
            <span className="text-slate-600 w-36 flex-shrink-0 text-sm">{label}</span>
            <span className="text-slate-900 text-sm font-medium">: {value || '-'}</span>
        </div>
    )
}

function PrintSection({ title, children }) {
    return (
        <div className="mt-5">
            <div className="border-b-2 border-slate-900 pb-1 mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">{title}</h3>
            </div>
            {children}
        </div>
    )
}

export default function CetakRM() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({
        visit: null, pasien: null, rm: null, vital: null, riwayat: null,
        perawatan: [], layanan: [], obat: [], odontogram: {},
    })

    useEffect(() => {
        async function load() {
            try {
                const [visitRes, rmRes, vitalRes, riwayatRes, perawatanRes, layananRes, obatRes] =
                    await Promise.allSettled([
                        api.get(`/kunjungan/${id}`),
                        api.get('/rekam_medis', { params: { id_kunjungan: id } }),
                        api.get('/rekam_medis', { params: { sub: 'vital', id_kunjungan: id } }),
                        api.get('/rekam_medis', { params: { sub: 'riwayat', id_kunjungan: id } }),
                        api.get('/perawatan', { params: { id_kunjungan: id } }),
                        api.get('/layanan/kunjungan', { params: { id_kunjungan: id } }),
                        api.get('/obat/kunjungan', { params: { id_kunjungan: id } }),
                    ])

                const visit = visitRes.status === 'fulfilled' ? visitRes.value.data : null
                const rm = rmRes.status === 'fulfilled' ? rmRes.value.data?.event?.[0] : null
                const vital = vitalRes.status === 'fulfilled' ? vitalRes.value.data?.event?.[0] : null
                const riwayat = riwayatRes.status === 'fulfilled' ? riwayatRes.value.data?.event?.[0] : null
                const perawatan = perawatanRes.status === 'fulfilled' ? perawatanRes.value.data?.event || [] : []
                const layanan = layananRes.status === 'fulfilled' ? layananRes.value.data?.event || [] : []
                const obat = obatRes.status === 'fulfilled' ? obatRes.value.data?.event || [] : []

                // Try to load pasien details if available
                let pasien = null
                if (visit?.id_pasien) {
                    try {
                        const pr = await api.get(`/pasien/${visit.id_pasien}`)
                        pasien = pr.data
                    } catch { }
                }

                // Try to load odontogram
                let odontogram = {}
                try {
                    const odRes = await api.get('/rekam_medis', { params: { sub: 'odontograma', id_kunjungan: id } })
                    const k = odRes.data?.keterangan
                    if (k) odontogram = typeof k === 'string' ? JSON.parse(k) : k
                } catch { }

                setData({ visit, pasien, rm, vital, riwayat, perawatan, layanan, obat, odontogram })
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [id])

    if (loading) return (
        <div className="flex h-screen items-center justify-center text-slate-500">
            <Loader2 className="animate-spin mr-2" /> Memuat rekam medis...
        </div>
    )

    const { visit, pasien, rm, vital, riwayat, perawatan, layanan, obat, odontogram } = data
    const totalLayanan = layanan.reduce((s, l) => s + (parseInt(l.harga_layanan) || 0) + (parseInt(l.harga_bahan) || 0), 0)
    const totalObat = obat.reduce((s, o) => s + (parseInt(o.harga) || 0) * (parseInt(o.quantity) || 1), 0)

    const riwayatAktif = riwayat
        ? Object.entries(RIWAYAT_LABELS).filter(([k]) => String(riwayat[`status_${k}`]) === '1')
        : []

    return (
        <div className="min-h-screen bg-white">
            {/* Print button — hidden on print */}
            <div className="no-print fixed top-4 right-4 z-50">
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-semibold"
                >
                    <Printer size={16} /> Cetak
                </button>
            </div>

            {/* Print content */}
            <div className="print-doc max-w-2xl mx-auto py-10 px-8 text-slate-900">
                {/* Header */}
                <div className="text-center border-b-2 border-slate-900 pb-4 mb-4">
                    <h1 className="text-xl font-black text-slate-900 uppercase">RSGM USU</h1>
                    <p className="text-sm text-slate-600">Rumah Sakit Gigi dan Mulut — Universitas Sumatera Utara</p>
                    <p className="text-lg font-bold mt-2 text-slate-900">REKAM MEDIS PASIEN</p>
                </div>

                {/* Visit & Pasien info */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <PrintRow label="No. Kunjungan" value={visit?.id_kunjungan} />
                        <PrintRow label="No. Antrian" value={visit?.id_antrian} />
                        <PrintRow label="Tanggal" value={formatDate(visit?.tanggal_kunjungan)} />
                        <PrintRow label="Klinik" value={KLINIK[visit?.id_klinik] || visit?.id_klinik} />
                    </div>
                    <div>
                        <PrintRow label="No. Rekam Medis" value={pasien?.no_rekam_medis || visit?.id_pasien} />
                        <PrintRow label="Nama Pasien" value={pasien?.nama} />
                        <PrintRow label="Cara Bayar" value={pasien?.cara_bayar} />
                    </div>
                </div>

                {/* Anamnese */}
                <PrintSection title="Anamnese & Diagnosa">
                    <div className="space-y-1">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-medium">Anamnese</p>
                            <p className="text-sm text-slate-900 mt-0.5 border border-slate-300 rounded p-2 min-h-10">{rm?.amnese || '-'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-medium">Diagnosa</p>
                            <p className="text-sm text-slate-900 mt-0.5 border border-slate-300 rounded p-2 min-h-10">{rm?.diagnosa || '-'}</p>
                        </div>
                    </div>
                </PrintSection>

                {/* Tanda Vital */}
                {vital && (
                    <PrintSection title="Tanda Vital">
                        <div className="grid grid-cols-3 gap-2">
                            {[['Kesadaran', vital.kesadaran], ['Kondisi Umum', vital.kondisi_umum], ['Tekanan Darah', vital.tekanan_darah],
                            ['Denyut Nadi', vital.denyut_nadi], ['Pernafasan', vital.pernafasan], ['Suhu', vital.suhu]]
                                .map(([l, v]) => (
                                    <div key={l} className="border border-slate-300 rounded p-2">
                                        <p className="text-xs text-slate-500">{l}</p>
                                        <p className="text-sm font-medium text-slate-900">{v || '-'}</p>
                                    </div>
                                ))}
                        </div>
                    </PrintSection>
                )}

                {/* Riwayat Penyakit */}
                {riwayatAktif.length > 0 && (
                    <PrintSection title="Riwayat Penyakit">
                        <div className="flex flex-wrap gap-2">
                            {riwayatAktif.map(([k, label]) => (
                                <div key={k} className="border border-slate-400 rounded px-3 py-1 text-sm text-slate-700">
                                    <strong>{label}</strong>
                                    {riwayat[`keterangan_${k}`] ? ` — ${riwayat[`keterangan_${k}`]}` : ''}
                                </div>
                            ))}
                        </div>
                    </PrintSection>
                )}

                {/* Odontogram */}
                {Object.keys(odontogram).length > 0 && (
                    <PrintSection title="Odontogram">
                        <Odontogram value={odontogram} readonly />
                    </PrintSection>
                )}

                {/* Perawatan */}
                {perawatan.length > 0 && (
                    <PrintSection title="Perawatan">
                        <table className="w-full text-sm border-collapse border border-slate-300">
                            <thead>
                                <tr className="bg-slate-100">
                                    {['Elemen', 'Diagnosa', 'Perawatan', 'ICD-10'].map(h => (
                                        <th key={h} className="border border-slate-300 px-2 py-1.5 text-left text-xs font-bold">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {perawatan.map(p => (
                                    <tr key={p.id}>
                                        <td className="border border-slate-300 px-2 py-1 font-mono text-xs">{p.element}</td>
                                        <td className="border border-slate-300 px-2 py-1">{p.diagnosa}</td>
                                        <td className="border border-slate-300 px-2 py-1">{p.perawatan}</td>
                                        <td className="border border-slate-300 px-2 py-1 font-mono text-xs">{p.icd10}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </PrintSection>
                )}

                {/* Layanan */}
                {layanan.length > 0 && (
                    <PrintSection title="Layanan">
                        <table className="w-full text-sm border-collapse border border-slate-300">
                            <thead><tr className="bg-slate-100">
                                <th className="border border-slate-300 px-2 py-1.5 text-left text-xs font-bold">Layanan</th>
                                <th className="border border-slate-300 px-2 py-1.5 text-right text-xs font-bold">Harga Bahan</th>
                                <th className="border border-slate-300 px-2 py-1.5 text-right text-xs font-bold">Harga Layanan</th>
                            </tr></thead>
                            <tbody>
                                {layanan.map(l => (
                                    <tr key={l.id}>
                                        <td className="border border-slate-300 px-2 py-1">{l.nama_layanan}</td>
                                        <td className="border border-slate-300 px-2 py-1 text-right font-mono">{formatCurrency(l.harga_bahan)}</td>
                                        <td className="border border-slate-300 px-2 py-1 text-right font-mono">{formatCurrency(l.harga_layanan)}</td>
                                    </tr>
                                ))}
                                <tr className="bg-slate-50">
                                    <td colSpan={2} className="border border-slate-300 px-2 py-1 font-bold text-right">Total Layanan</td>
                                    <td className="border border-slate-300 px-2 py-1 text-right font-bold font-mono">{formatCurrency(totalLayanan)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </PrintSection>
                )}

                {/* Resep Obat */}
                {obat.length > 0 && (
                    <PrintSection title="Resep Obat">
                        <table className="w-full text-sm border-collapse border border-slate-300">
                            <thead><tr className="bg-slate-100">
                                <th className="border border-slate-300 px-2 py-1.5 text-left text-xs font-bold">Obat</th>
                                <th className="border border-slate-300 px-2 py-1.5 text-center text-xs font-bold">Qty</th>
                                <th className="border border-slate-300 px-2 py-1.5 text-left text-xs font-bold">Satuan</th>
                                <th className="border border-slate-300 px-2 py-1.5 text-right text-xs font-bold">Harga</th>
                            </tr></thead>
                            <tbody>
                                {obat.map((o, i) => (
                                    <tr key={o.id}>
                                        <td className="border border-slate-300 px-2 py-1">{o.nama_obat}</td>
                                        <td className="border border-slate-300 px-2 py-1 text-center">{o.quantity}</td>
                                        <td className="border border-slate-300 px-2 py-1">{o.satuan}</td>
                                        <td className="border border-slate-300 px-2 py-1 text-right font-mono">{formatCurrency(o.harga)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </PrintSection>
                )}

                {/* Total tagihan */}
                <PrintSection title="Ringkasan Tagihan">
                    <div className="flex justify-end">
                        <div className="w-64 space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Total Layanan</span>
                                <span className="font-mono">{formatCurrency(totalLayanan)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Total Obat</span>
                                <span className="font-mono">{formatCurrency(totalObat)}</span>
                            </div>
                            <div className="flex justify-between font-bold border-t border-slate-900 pt-1 text-sm">
                                <span>Total</span>
                                <span className="font-mono">{formatCurrency(totalLayanan + totalObat)}</span>
                            </div>
                        </div>
                    </div>
                </PrintSection>

                {/* Signatures */}
                <div className="mt-8 grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <p className="text-sm text-slate-600">Dokter Pemeriksa</p>
                        <div className="h-16 border-b border-slate-400 mt-2" />
                        <p className="text-xs text-slate-500 mt-1">(...................................)</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-slate-600">Pasien / Wali</p>
                        <div className="h-16 border-b border-slate-400 mt-2" />
                        <p className="text-xs text-slate-500 mt-1">(...................................)</p>
                    </div>
                </div>

                <p className="text-center text-xs text-slate-400 mt-8">
                    Dicetak: {new Date().toLocaleString('id-ID')} · RSGM USU Sistem Informasi
                </p>
            </div>
        </div>
    )
}
