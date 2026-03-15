import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FileText, Loader2, ArrowLeft, Printer } from 'lucide-react'
import api from '@/lib/api'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function ApotekInvoice() {
    const { id } = useParams() // id_kunjungan
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [obatList, setObatList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            api.get(`/kunjungan/${id}`),
            api.get('/obat/kunjungan', { params: { id_kunjungan: id } }),
        ]).then(([visitRes, obatRes]) => {
            setData(visitRes.data)
            setObatList(obatRes.data.event || [])
        }).catch(() => { }).finally(() => setLoading(false))
    }, [id])

    const total = obatList.reduce((s, o) => s + (parseInt(o.harga) || 0) * (parseInt(o.quantity) || 1), 0)

    if (loading) return <div className="flex h-64 items-center justify-center text-slate-600 p-6"><Loader2 className="animate-spin mr-2" /> Memuat...</div>

    return (
        <div className="p-6 space-y-6 min-w-0">
            <div className="flex items-center justify-between gap-4 min-w-0 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                    <button onClick={() => navigate(-1)} className="text-slate-600 hover:text-slate-900 transition-colors p-1 flex-shrink-0"><ArrowLeft size={20} /></button>
                    <div className="min-w-0">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><FileText size={22} className="text-teal-600" /> Invoice Apotek</h2>
                        <p className="text-slate-600 text-xs font-mono mt-0.5">{id}</p>
                    </div>
                </div>
                <button onClick={() => window.print()} className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0">
                    <Printer size={16} /> Cetak
                </button>
            </div>

            {data && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 grid grid-cols-2 gap-6 text-sm min-w-0">
                    <div className="min-w-0"><p className="text-slate-400 text-xs">No. Kunjungan</p><p className="text-slate-900 font-mono">{data.id_kunjungan}</p></div>
                    <div className="min-w-0"><p className="text-slate-400 text-xs">Tanggal</p><p className="text-slate-900">{formatDate(data.tanggal_kunjungan)}</p></div>
                    <div className="min-w-0"><p className="text-slate-400 text-xs">ID Pasien</p><p className="text-slate-900">{data.id_pasien}</p></div>
                    <div className="min-w-0"><p className="text-slate-400 text-xs">Klinik</p><p className="text-slate-900">{data.id_klinik}</p></div>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-w-0">
                <div className="px-6 py-4 border-b border-slate-200 min-w-0"><p className="text-slate-900 font-medium text-sm">Daftar Obat</p></div>
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-200 bg-slate-50">
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">#</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Nama Obat</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Qty</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Satuan</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Harga</th>
                        <th className="text-right px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Subtotal</th>
                    </tr></thead>
                    <tbody>
                        {obatList.length === 0 ? (
                            <tr><td colSpan={6} className="text-center py-8 text-slate-400">Tidak ada obat pada kunjungan ini</td></tr>
                        ) : obatList.map((o, i) => (
                            <tr key={o.id} className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="px-6 py-3 text-slate-600 min-w-0">{i + 1}</td>
                                <td className="px-6 py-3 text-slate-900 font-medium min-w-0">{o.nama_obat}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{o.quantity}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{o.satuan}</td>
                                <td className="px-6 py-3 text-slate-600 font-mono min-w-0">{formatCurrency(o.harga)}</td>
                                <td className="px-6 py-3 text-slate-600 font-mono text-right min-w-0">{formatCurrency((parseInt(o.harga) || 0) * (parseInt(o.quantity) || 1))}</td>
                            </tr>
                        ))}
                    </tbody>
                    {obatList.length > 0 && (
                        <tfoot>
                            <tr className="border-t-2 border-slate-200 bg-slate-50">
                                <td colSpan={5} className="px-6 py-4 text-right text-slate-900 font-semibold">Total</td>
                                <td className="px-6 py-4 text-slate-900 font-bold font-mono text-right">{formatCurrency(total)}</td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
        </div>
    )
}
