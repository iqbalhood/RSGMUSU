import React, { useEffect, useState } from 'react'
import { CreditCard, Loader2, CheckCircle, GitBranch } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/api'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function KasirDashboard() {
    const [unpaid, setUnpaid] = useState([])
    const [loading, setLoading] = useState(true)
    const [completing, setCompleting] = useState(null)
    const navigate = useNavigate()

    function load() {
        setLoading(true)
        api.get('/kunjungan', { params: { kasir: '' } })
            .then(({ data }) => setUnpaid(data.event || []))
            .catch(() => { })
            .finally(() => setLoading(false))
    }

    useEffect(() => { load() }, [])

    async function completeOrder(v) {
        setCompleting(v.id_kunjungan)
        try {
            await api.put(`/kunjungan/${v.id_kunjungan}/complete`)
            load()
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal')
        } finally {
            setCompleting(null)
        }
    }

    return (
        <div className="p-6 space-y-4 animate-fadeIn">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><CreditCard size={22} className="text-amber-400" /> Kasir</h2>
                <p className="text-slate-400 text-sm mt-1">Tagihan yang belum dibayar</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                            <th className="text-left px-4 py-3 font-medium">No. Kunjungan</th>
                            <th className="text-left px-4 py-3 font-medium">Pasien</th>
                            <th className="text-left px-4 py-3 font-medium">Tgl Kunjungan</th>
                            <th className="text-left px-4 py-3 font-medium">Biaya RM</th>
                            <th className="text-left px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} className="text-center py-8 text-slate-500"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : unpaid.length === 0 ? (
                            <tr><td colSpan={6} className="text-center py-8 text-slate-500">Tidak ada tagihan</td></tr>
                        ) : unpaid.map((v) => (
                            <tr key={v.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                <td className="px-4 py-3 text-blue-400 font-mono text-xs">{v.id_kunjungan}</td>
                                <td className="px-4 py-3 text-white">{v.id_pasien}</td>
                                <td className="px-4 py-3 text-slate-400">{formatDate(v.tanggal_kunjungan)}</td>
                                <td className="px-4 py-3 text-emerald-400">{formatCurrency(v.biaya_rekam_medis)}</td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-xs">Belum Bayar</span></td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => navigate(`/kasir/cicilan/${v.id_kunjungan}`)}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition-all">
                                            <GitBranch size={12} /> Cicilan
                                        </button>
                                        <button onClick={() => completeOrder(v)} disabled={completing === v.id_kunjungan}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-all disabled:opacity-60">
                                            {completing === v.id_kunjungan ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                                            Bayar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
