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

    return (
        <div className="p-6 space-y-4 animate-fadeIn">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><History size={22} className="text-emerald-400" /> Riwayat Pembayaran</h2>
                <p className="text-slate-400 text-sm mt-1">Kunjungan yang sudah dibayar</p>
            </div>

            {/* Filter */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap gap-3 items-end">
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Dari Tanggal</label>
                    <input type="date" value={tawal} onChange={e => setTawal(e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Sampai Tanggal</label>
                    <input type="date" value={takhir} onChange={e => setTakhir(e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Klinik</label>
                    <select value={klinik} onChange={e => setKlinik(e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {KLINIK_LIST.map(k => <option key={k.id} value={k.id}>{k.label}</option>)}
                    </select>
                </div>
                <button onClick={doSearch} disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all">
                    {loading ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
                    Tampilkan
                </button>
            </div>

            {/* Summary */}
            {searched && !loading && (
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="bg-emerald-600/10 border border-emerald-600/30 rounded-xl px-4 py-2.5">
                        <p className="text-xs text-emerald-400">Total Transaksi</p>
                        <p className="text-lg font-bold text-white">{data.length}</p>
                    </div>
                    <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl px-4 py-2.5">
                        <p className="text-xs text-blue-400">Total Pendapatan</p>
                        <p className="text-lg font-bold text-white">{formatCurrency(total)}</p>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-800 text-slate-400">
                        <th className="text-left px-4 py-3 font-medium">No. Kunjungan</th>
                        <th className="text-left px-4 py-3 font-medium">Pasien</th>
                        <th className="text-left px-4 py-3 font-medium">Klinik</th>
                        <th className="text-left px-4 py-3 font-medium">Tgl Bayar</th>
                        <th className="text-left px-4 py-3 font-medium">Biaya</th>
                    </tr></thead>
                    <tbody>
                        {!searched ? (
                            <tr><td colSpan={5} className="text-center py-10 text-slate-600">Gunakan filter di atas untuk menampilkan data</td></tr>
                        ) : loading ? (
                            <tr><td colSpan={5} className="text-center py-10 text-slate-500"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-10 text-slate-500">Tidak ada data pada rentang waktu ini</td></tr>
                        ) : data.map(v => (
                            <tr key={v.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                <td className="px-4 py-3 text-blue-400 font-mono text-xs">{v.id_kunjungan}</td>
                                <td className="px-4 py-3 text-white">{v.id_pasien}</td>
                                <td className="px-4 py-3 text-slate-400">{KLINIK_LIST.find(k => String(k.id) === String(v.id_klinik))?.label || v.id_klinik}</td>
                                <td className="px-4 py-3 text-slate-400">{formatDate(v.tanggal_pembayaran)}</td>
                                <td className="px-4 py-3 text-emerald-400 font-mono">{formatCurrency(v.biaya_rekam_medis)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
