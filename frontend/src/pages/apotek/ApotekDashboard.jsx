import React, { useEffect, useState } from 'react'
import { Pill, Loader2, Search } from 'lucide-react'
import api from '@/lib/api'
import { formatCurrency } from '@/lib/utils'

export default function ApotekDashboard() {
    const [obat, setObat] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        api.get('/apotek/list_data_obat')
            .then(({ data }) => setObat(data.event || []))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    const filtered = obat.filter((o) =>
        o.nama?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="p-6 space-y-6 min-w-0">
            <div className="min-w-0">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Pill size={22} className="text-teal-600" /> Apotek</h2>
                <p className="text-slate-600 text-sm mt-1">Manajemen obat dan invoice</p>
            </div>

            <div className="relative min-w-0">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari obat..."
                    className="w-full border border-slate-300 rounded-lg pl-11 pr-4 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none placeholder:text-slate-400"
                />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-w-0">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Nama Obat</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Quantity</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Satuan</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} className="text-center py-8 text-slate-600"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={4} className="text-center py-8 text-slate-400">Tidak ada data obat</td></tr>
                        ) : filtered.map((o) => (
                            <tr key={o.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-3 text-slate-900 font-medium min-w-0">{o.nama}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{o.quantity}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{o.satuan}</td>
                                <td className="px-6 py-3 text-slate-600 font-mono min-w-0">{formatCurrency(o.harga)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
