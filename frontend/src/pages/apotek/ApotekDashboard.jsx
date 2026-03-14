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
        <div className="p-6 space-y-4 animate-fadeIn">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Pill size={22} className="text-violet-400" /> Apotek</h2>
                <p className="text-slate-400 text-sm mt-1">Manajemen obat dan invoice</p>
            </div>

            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari obat..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600" />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                            <th className="text-left px-4 py-3 font-medium">Nama Obat</th>
                            <th className="text-left px-4 py-3 font-medium">Quantity</th>
                            <th className="text-left px-4 py-3 font-medium">Satuan</th>
                            <th className="text-left px-4 py-3 font-medium">Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} className="text-center py-8 text-slate-500"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={4} className="text-center py-8 text-slate-500">Tidak ada data obat</td></tr>
                        ) : filtered.map((o) => (
                            <tr key={o.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                <td className="px-4 py-3 text-white font-medium">{o.nama}</td>
                                <td className="px-4 py-3 text-slate-400">{o.quantity}</td>
                                <td className="px-4 py-3 text-slate-400">{o.satuan}</td>
                                <td className="px-4 py-3 text-emerald-400 font-mono">{formatCurrency(o.harga)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
