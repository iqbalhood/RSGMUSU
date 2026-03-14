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
        <div className="p-6 space-y-4 animate-fadeIn">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Hospital size={22} /> Kunjungan Aktif</h2>
                <p className="text-slate-400 text-sm mt-1">Daftar pasien yang sedang antri ke klinik</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                            <th className="text-left px-4 py-3 font-medium">No. Antrian</th>
                            <th className="text-left px-4 py-3 font-medium">No. Kunjungan</th>
                            <th className="text-left px-4 py-3 font-medium">ID Pasien</th>
                            <th className="text-left px-4 py-3 font-medium">Klinik</th>
                            <th className="text-left px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} className="text-center py-8 text-slate-500"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : visits.length === 0 ? (
                            <tr><td colSpan={6} className="text-center py-8 text-slate-500">Tidak ada kunjungan aktif</td></tr>
                        ) : visits.map((v) => (
                            <tr key={v.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                <td className="px-4 py-3 text-blue-400 font-mono text-xs">{v.id_antrian}</td>
                                <td className="px-4 py-3 text-slate-300 font-mono text-xs">{v.id_kunjungan}</td>
                                <td className="px-4 py-3 text-slate-400">{v.id_pasien}</td>
                                <td className="px-4 py-3 text-slate-400">{v.id_klinik}</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${v.status === '1' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                        {v.status === '1' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                        {v.status === '1' ? 'Selesai' : 'Antri'}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <button className="text-slate-400 hover:text-blue-400 transition-colors"><ArrowRight size={15} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
