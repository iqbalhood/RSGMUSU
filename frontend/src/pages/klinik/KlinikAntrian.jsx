import React, { useEffect, useState } from 'react'
import { Hospital, Loader2, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/api'

export default function KlinikAntrian() {
    const [antrian, setAntrian] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/kunjungan', { params: { status: '0' } })
            .then(({ data }) => setAntrian(data.event || []))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="p-6 space-y-6 min-w-0">
            <div className="min-w-0">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Hospital size={22} className="text-teal-600" /> Antrian Masuk</h2>
                <p className="text-slate-600 text-sm mt-1">Pasien yang menunggu pemeriksaan</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-w-0">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">No. Antrian</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">No. Kunjungan</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Pasien</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Dokter</th>
                            <th className="px-6 py-4" />
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-600"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : antrian.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-400">Tidak ada antrian</td></tr>
                        ) : antrian.map((a) => (
                            <tr
                                key={a.id}
                                className="border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                                onClick={() => navigate(`/klinik/rekam-medis/${a.id_kunjungan}`)}
                            >
                                <td className="px-6 py-3 text-slate-900 font-mono text-xs min-w-0">{a.id_antrian}</td>
                                <td className="px-6 py-3 text-slate-600 font-mono text-xs min-w-0">{a.id_kunjungan}</td>
                                <td className="px-6 py-3 text-slate-900 font-medium min-w-0">{a.id_pasien}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{a.id_dokter}</td>
                                <td className="px-6 py-3 min-w-0"><ArrowRight size={15} className="text-slate-400" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
