import React, { useEffect, useState } from 'react'
import { History, Loader2, Search, Calendar } from 'lucide-react'
import api from '@/lib/api'
import { formatDate, formatCurrency } from '@/lib/utils'

const KLINIK_LIST = [
    { id: '', label: 'Semua Klinik' },
    { id: '1', label: 'IKGP' }, { id: '2', label: 'Periodonsia' }, { id: '3', label: 'IPM' },
    { id: '4', label: 'IKGA' }, { id: '5', label: 'Konservasi' }, { id: '6', label: 'Prostodonsia' },
    { id: '7', label: 'Bedah Mulut' }, { id: '8', label: 'Ortodonsia' }, { id: '9', label: 'Radiologi' },
]

function todayStr() {
    return new Date().toISOString().split('T')[0]
}

export default function KasirRiwayat() {
    const [tawal, setTawal] = useState(todayStr())
    const [takhir, setTakhir] = useState(todayStr())
    const [klinik, setKlinik] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searched, setSearched] = useState(false)

    async function doSearch() {
        setLoading(true)
        setSearched(true)
        try {
            const { data: res } = await api.get('/kunjungan/kasir', {
                params: { tawal, takhir, ...(klinik ? { klinik } : {}) },
            })
            setData(res.event || [])
        } catch {
            setData([])
        } finally {
            setLoading(false)
        }
    }

    const total = data.reduce((s, v) => s + (parseInt(v.biaya_rekam_medis) || 0), 0)

    const inputCls = 'border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none w-full'

    return (
        <div className="p-6 space-y-6 min-w-0">
            <div className="min-w-0">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><History size={22} className="text-teal-600" /> Riwayat Pembayaran</h2>
                <p className="text-slate-600 text-sm mt-1">Kunjungan yang sudah dibayar</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-wrap gap-6 items-end min-w-0">
                <div className="min-w-0">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Dari Tanggal</label>
                    <input type="date" value={tawal} onChange={e => setTawal(e.target.value)} className={inputCls} />
                </div>
                <div className="min-w-0">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Sampai Tanggal</label>
                    <input type="date" value={takhir} onChange={e => setTakhir(e.target.value)} className={inputCls} />
                </div>
                <div className="min-w-0">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Klinik</label>
                    <select value={klinik} onChange={e => setKlinik(e.target.value)} className={inputCls}>
                        {KLINIK_LIST.map(k => <option key={k.id} value={k.id}>{k.label}</option>)}
                    </select>
                </div>
                <button onClick={doSearch} disabled={loading}
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0">
                    {loading ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
                    Tampilkan
                </button>
            </div>

            {searched && !loading && (
                <div className="flex items-center gap-6 flex-wrap min-w-0">
                    <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2.5 min-w-0">
                        <p className="text-xs text-teal-600">Total Transaksi</p>
                        <p className="text-lg font-bold text-slate-900">{data.length}</p>
                    </div>
                    <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2.5 min-w-0">
                        <p className="text-xs text-teal-600">Total Pendapatan</p>
                        <p className="text-lg font-bold text-slate-900">{formatCurrency(total)}</p>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-w-0">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-200 bg-slate-50">
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">No. Kunjungan</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Pasien</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Klinik</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Tgl Bayar</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Biaya</th>
                    </tr></thead>
                    <tbody>
                        {!searched ? (
                            <tr><td colSpan={5} className="text-center py-10 text-slate-600">Gunakan filter di atas untuk menampilkan data</td></tr>
                        ) : loading ? (
                            <tr><td colSpan={5} className="text-center py-10 text-slate-600"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-10 text-slate-400">Tidak ada data pada rentang waktu ini</td></tr>
                        ) : data.map(v => (
                            <tr key={v.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-3 text-slate-900 font-mono text-xs min-w-0">{v.id_kunjungan}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{v.id_pasien}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{KLINIK_LIST.find(k => String(k.id) === String(v.id_klinik))?.label || v.id_klinik}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{formatDate(v.tanggal_pembayaran)}</td>
                                <td className="px-6 py-3 text-slate-600 font-mono min-w-0">{formatCurrency(v.biaya_rekam_medis)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
