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
        <div className="p-6 space-y-4 animate-fadeIn">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Hospital size={22} /> Antrian Masuk</h2>
                <p className="text-slate-400 text-sm mt-1">Pasien yang menunggu pemeriksaan</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                            <th className="text-left px-4 py-3 font-medium">No. Antrian</th>
                            <th className="text-left px-4 py-3 font-medium">No. Kunjungan</th>
                            <th className="text-left px-4 py-3 font-medium">Pasien</th>
                            <th className="text-left px-4 py-3 font-medium">Dokter</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-500"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : antrian.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-500">Tidak ada antrian</td></tr>
                        ) : antrian.map((a) => (
                            <tr key={a.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 cursor-pointer transition-colors"
                                onClick={() => navigate(`/klinik/rekam-medis/${a.id_kunjungan}`)}>
                                <td className="px-4 py-3 text-blue-400 font-mono text-xs">{a.id_antrian}</td>
                                <td className="px-4 py-3 text-slate-300 font-mono text-xs">{a.id_kunjungan}</td>
                                <td className="px-4 py-3 text-white">{a.id_pasien}</td>
                                <td className="px-4 py-3 text-slate-400">{a.id_dokter}</td>
                                <td className="px-4 py-3"><ArrowRight size={15} className="text-slate-500" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
