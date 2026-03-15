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
        <div className="p-6 space-y-6 min-w-0">
            <div className="min-w-0">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Hospital size={22} className="text-teal-600" /> Data Layanan</h2>
                <p className="text-slate-600 text-sm mt-1">Master layanan per klinik</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-w-0">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-200 bg-slate-50">
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Layanan</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Klinik</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Harga Koas</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Harga Drg</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Harga Drg Sp</th>
                    </tr></thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-600"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-400">Tidak ada layanan</td></tr>
                        ) : data.map(l => (
                            <tr key={l.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-3 text-slate-900 font-medium min-w-0">{l.layanan}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{l.idklinik}</td>
                                <td className="px-6 py-3 text-slate-600 font-mono min-w-0">{formatCurrency(l.harga_koas)}</td>
                                <td className="px-6 py-3 text-slate-600 font-mono min-w-0">{formatCurrency(l.harga_drg)}</td>
                                <td className="px-6 py-3 text-slate-600 font-mono min-w-0">{formatCurrency(l.harga_drgsp)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
