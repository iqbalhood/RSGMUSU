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
        <div className="p-6 space-y-6 min-w-0">
            <div className="min-w-0">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Search size={22} className="text-teal-600" /> Pencarian</h2>
                <p className="text-slate-600 text-sm mt-1">Cari pasien, layanan, atau perawatan</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 min-w-0">
                {TABS.map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        onClick={() => changeTab(key)}
                        className={`flex-1 min-w-0 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${tab === key ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        <Icon size={15} /> {label}
                    </button>
                ))}
            </div>

            {/* Search box */}
            <div className="flex gap-6 min-w-0 flex-wrap">
                <div className="relative flex-1 min-w-0">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && doSearch()}
                        placeholder={`Cari ${tab}...`}
                        className="w-full border border-slate-300 rounded-lg pl-11 pr-4 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none placeholder:text-slate-400"
                    />
                </div>
                <button
                    onClick={doSearch}
                    disabled={loading}
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-60 flex-shrink-0"
                >
                    {loading ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
                    Cari
                </button>
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-w-0">
                {!searched ? (
                    <p className="text-center text-slate-600 py-12">Masukkan kata kunci untuk mencari</p>
                ) : loading ? (
                    <div className="text-center py-12"><Loader2 className="animate-spin inline text-slate-500" /></div>
                ) : results.length === 0 ? (
                    <p className="text-center text-slate-400 py-12">Tidak ada hasil untuk &ldquo;{keyword}&rdquo;</p>
                ) : tab === 'pasien' ? (
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-200 bg-slate-50">
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">No. RM</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Nama</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Tgl Lahir</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">No. HP</th>
                        </tr></thead>
                        <tbody>
                            {results.map(p => (
                                <tr key={p.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-3 text-slate-900 font-mono text-xs min-w-0">{p.no_rekam_medis}</td>
                                    <td className="px-6 py-3 text-slate-900 font-medium min-w-0">{p.nama}</td>
                                    <td className="px-6 py-3 text-slate-600 min-w-0">{formatDate(p.tanggal_lahir)}</td>
                                    <td className="px-6 py-3 text-slate-600 min-w-0">{p.nomor_hp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : tab === 'layanan' ? (
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-200 bg-slate-50">
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Layanan</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Klinik</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Harga Koas</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Harga Drg</th>
                        </tr></thead>
                        <tbody>
                            {results.map(l => (
                                <tr key={l.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-3 text-slate-900 font-medium min-w-0">{l.layanan}</td>
                                    <td className="px-6 py-3 text-slate-600 min-w-0">{l.idklinik}</td>
                                    <td className="px-6 py-3 text-slate-600 font-mono min-w-0">{formatCurrency(l.harga_koas)}</td>
                                    <td className="px-6 py-3 text-slate-600 font-mono min-w-0">{formatCurrency(l.harga_drg)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-200 bg-slate-50">
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Elemen</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Diagnosa</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Perawatan</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">ICD-10</th>
                        </tr></thead>
                        <tbody>
                            {results.map(r => (
                                <tr key={r.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-3 text-slate-900 font-mono text-xs min-w-0">{r.element}</td>
                                    <td className="px-6 py-3 text-slate-600 min-w-0">{r.diagnosa}</td>
                                    <td className="px-6 py-3 text-slate-900 font-medium min-w-0">{r.perawatan}</td>
                                    <td className="px-6 py-3 text-slate-600 font-mono text-xs min-w-0">{r.icd10}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
