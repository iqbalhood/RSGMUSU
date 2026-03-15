import React, { useEffect, useState } from 'react'
import { Loader2, Hospital, ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import api from '@/lib/api'

export default function FrontdeskKunjungan() {
    const [visits, setVisits] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/kunjungan', { params: { status: '0' } })
            .then(({ data }) => setVisits(data.event || []))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="p-6 space-y-6 min-w-0">
            <div className="min-w-0">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Hospital size={22} className="text-teal-600" /> Kunjungan Aktif</h2>
                <p className="text-slate-600 text-sm mt-1">Daftar pasien yang sedang antri ke klinik</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-w-0">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">No. Antrian</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">No. Kunjungan</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">ID Pasien</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Klinik</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Status</th>
                            <th className="px-6 py-4" />
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} className="text-center py-8 text-slate-600"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : visits.length === 0 ? (
                            <tr><td colSpan={6} className="text-center py-8 text-slate-400">Tidak ada kunjungan aktif</td></tr>
                        ) : visits.map((v) => (
                            <tr key={v.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-3 text-slate-900 font-mono text-xs min-w-0">{v.id_antrian}</td>
                                <td className="px-6 py-3 text-slate-600 font-mono text-xs min-w-0">{v.id_kunjungan}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{v.id_pasien}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{v.id_klinik}</td>
                                <td className="px-6 py-3 min-w-0">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${v.status === '1' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {v.status === '1' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                        {v.status === '1' ? 'Selesai' : 'Antri'}
                                    </span>
                                </td>
                                <td className="px-6 py-3 min-w-0">
                                    <button className="text-slate-400 hover:text-teal-600 transition-colors p-1"><ArrowRight size={15} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
