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
        <div className="p-6 space-y-6 min-w-0">
            <div className="min-w-0">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><CreditCard size={22} className="text-teal-600" /> Kasir</h2>
                <p className="text-slate-600 text-sm mt-1">Tagihan yang belum dibayar</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-w-0">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">No. Kunjungan</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Pasien</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Tgl Kunjungan</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Biaya RM</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Status</th>
                            <th className="px-6 py-4" />
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} className="text-center py-8 text-slate-600"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : unpaid.length === 0 ? (
                            <tr><td colSpan={6} className="text-center py-8 text-slate-400">Tidak ada tagihan</td></tr>
                        ) : unpaid.map((v) => (
                            <tr key={v.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-3 text-slate-900 font-mono text-xs min-w-0">{v.id_kunjungan}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{v.id_pasien}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{formatDate(v.tanggal_kunjungan)}</td>
                                <td className="px-6 py-3 text-slate-600 font-mono min-w-0">{formatCurrency(v.biaya_rekam_medis)}</td>
                                <td className="px-6 py-3 min-w-0"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium">Belum Bayar</span></td>
                                <td className="px-6 py-3 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => navigate(`/kasir/cicilan/${v.id_kunjungan}`)}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-medium transition-all">
                                            <GitBranch size={12} /> Cicilan
                                        </button>
                                        <button onClick={() => completeOrder(v)} disabled={completing === v.id_kunjungan}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-medium transition-all disabled:opacity-60">
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
