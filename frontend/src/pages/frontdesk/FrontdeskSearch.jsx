import React, { useState } from 'react'
import { Search, Loader2, User, Pill, ClipboardList } from 'lucide-react'
import api from '@/lib/api'
import { formatDate, formatCurrency } from '@/lib/utils'

const TABS = [
    { key: 'pasien', label: 'Pasien', icon: User },
    { key: 'layanan', label: 'Layanan', icon: ClipboardList },
    { key: 'perawatan', label: 'Perawatan', icon: Pill },
]

export default function FrontdeskSearch() {
    const [tab, setTab] = useState('pasien')
    const [keyword, setKeyword] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [searched, setSearched] = useState(false)

    async function doSearch() {
        if (!keyword.trim()) return
        setLoading(true)
        setSearched(true)
        try {
            let res
            if (tab === 'pasien') {
                res = await api.get('/pasien', { params: { search: keyword } })
                setResults(res.data.event || [])
            } else {
                res = await api.get('/search', { params: { type: tab, keyword } })
                setResults(res.data.event || [])
            }
        } catch {
            setResults([])
        } finally {
            setLoading(false)
        }
    }

    function changeTab(t) {
        setTab(t)
        setResults([])
        setSearched(false)
    }

    return (
        <div className="p-6 space-y-4 animate-fadeIn">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Search size={22} className="text-blue-400" /> Pencarian</h2>
                <p className="text-slate-400 text-sm mt-1">Cari pasien, layanan, atau perawatan</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
                {TABS.map(({ key, label, icon: Icon }) => (
                    <button key={key} onClick={() => changeTab(key)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${tab === key ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                        <Icon size={15} /> {label}
                    </button>
                ))}
            </div>

            {/* Search box */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && doSearch()}
                        placeholder={`Cari ${tab}...`}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
                    />
                </div>
                <button onClick={doSearch} disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-60">
                    {loading ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
                    Cari
                </button>
            </div>

            {/* Results */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                {!searched ? (
                    <p className="text-center text-slate-600 py-12">Masukkan kata kunci untuk mencari</p>
                ) : loading ? (
                    <div className="text-center py-12"><Loader2 className="animate-spin inline text-slate-500" /></div>
                ) : results.length === 0 ? (
                    <p className="text-center text-slate-500 py-12">Tidak ada hasil untuk &ldquo;{keyword}&rdquo;</p>
                ) : tab === 'pasien' ? (
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-800 text-slate-400">
                            <th className="text-left px-4 py-3 font-medium">No. RM</th>
                            <th className="text-left px-4 py-3 font-medium">Nama</th>
                            <th className="text-left px-4 py-3 font-medium">Tgl Lahir</th>
                            <th className="text-left px-4 py-3 font-medium">No. HP</th>
                        </tr></thead>
                        <tbody>
                            {results.map(p => (
                                <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 text-blue-400 font-mono text-xs">{p.no_rekam_medis}</td>
                                    <td className="px-4 py-3 text-white font-medium">{p.nama}</td>
                                    <td className="px-4 py-3 text-slate-400">{formatDate(p.tanggal_lahir)}</td>
                                    <td className="px-4 py-3 text-slate-400">{p.nomor_hp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : tab === 'layanan' ? (
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-800 text-slate-400">
                            <th className="text-left px-4 py-3 font-medium">Layanan</th>
                            <th className="text-left px-4 py-3 font-medium">Klinik</th>
                            <th className="text-left px-4 py-3 font-medium">Harga Koas</th>
                            <th className="text-left px-4 py-3 font-medium">Harga Drg</th>
                        </tr></thead>
                        <tbody>
                            {results.map(l => (
                                <tr key={l.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 text-white font-medium">{l.layanan}</td>
                                    <td className="px-4 py-3 text-slate-400">{l.idklinik}</td>
                                    <td className="px-4 py-3 text-emerald-400 font-mono">{formatCurrency(l.harga_koas)}</td>
                                    <td className="px-4 py-3 text-emerald-400 font-mono">{formatCurrency(l.harga_drg)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-800 text-slate-400">
                            <th className="text-left px-4 py-3 font-medium">Elemen</th>
                            <th className="text-left px-4 py-3 font-medium">Diagnosa</th>
                            <th className="text-left px-4 py-3 font-medium">Perawatan</th>
                            <th className="text-left px-4 py-3 font-medium">ICD-10</th>
                        </tr></thead>
                        <tbody>
                            {results.map(r => (
                                <tr key={r.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 text-blue-400 font-mono text-xs">{r.element}</td>
                                    <td className="px-4 py-3 text-slate-300">{r.diagnosa}</td>
                                    <td className="px-4 py-3 text-white">{r.perawatan}</td>
                                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{r.icd10}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
