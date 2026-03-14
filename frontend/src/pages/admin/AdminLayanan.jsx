import React, { useEffect, useState } from 'react'
import { Hospital, Loader2 } from 'lucide-react'
import api from '@/lib/api'
import { formatCurrency } from '@/lib/utils'

export default function AdminLayanan() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/layanan').then(r => setData(r.data.event || [])).catch(() => { }).finally(() => setLoading(false))
    }, [])

    return (
        <div className="p-6 space-y-4 animate-fadeIn">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Hospital size={22} /> Data Layanan</h2>
                <p className="text-slate-400 text-sm mt-1">Master layanan per klinik</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-800 text-slate-400">
                        <th className="text-left px-4 py-3 font-medium">Layanan</th>
                        <th className="text-left px-4 py-3 font-medium">Klinik</th>
                        <th className="text-left px-4 py-3 font-medium">Harga Koas</th>
                        <th className="text-left px-4 py-3 font-medium">Harga Drg</th>
                        <th className="text-left px-4 py-3 font-medium">Harga Drg Sp</th>
                    </tr></thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-500"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-500">Tidak ada layanan</td></tr>
                        ) : data.map(l => (
                            <tr key={l.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                <td className="px-4 py-3 text-white font-medium">{l.layanan}</td>
                                <td className="px-4 py-3 text-slate-400">{l.idklinik}</td>
                                <td className="px-4 py-3 text-emerald-400 font-mono">{formatCurrency(l.harga_koas)}</td>
                                <td className="px-4 py-3 text-emerald-400 font-mono">{formatCurrency(l.harga_drg)}</td>
                                <td className="px-4 py-3 text-emerald-400 font-mono">{formatCurrency(l.harga_drgsp)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
