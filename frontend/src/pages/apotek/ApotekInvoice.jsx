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

    if (loading) return <div className="flex h-64 items-center justify-center text-slate-500"><Loader2 className="animate-spin mr-2" /> Memuat...</div>

    return (
        <div className="p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition-colors"><ArrowLeft size={20} /></button>
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2"><FileText size={22} className="text-violet-400" /> Invoice Apotek</h2>
                        <p className="text-slate-400 text-xs font-mono mt-0.5">{id}</p>
                    </div>
                </div>
                <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all">
                    <Printer size={16} /> Cetak
                </button>
            </div>

            {/* Visit info */}
            {data && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-slate-400 text-xs">No. Kunjungan</p><p className="text-blue-400 font-mono">{data.id_kunjungan}</p></div>
                    <div><p className="text-slate-400 text-xs">Tanggal</p><p className="text-white">{formatDate(data.tanggal_kunjungan)}</p></div>
                    <div><p className="text-slate-400 text-xs">ID Pasien</p><p className="text-white">{data.id_pasien}</p></div>
                    <div><p className="text-slate-400 text-xs">Klinik</p><p className="text-white">{data.id_klinik}</p></div>
                </div>
            )}

            {/* Obat table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-800"><p className="text-white font-medium text-sm">Daftar Obat</p></div>
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-800 text-slate-400">
                        <th className="text-left px-4 py-2.5 font-medium">#</th>
                        <th className="text-left px-4 py-2.5 font-medium">Nama Obat</th>
                        <th className="text-left px-4 py-2.5 font-medium">Qty</th>
                        <th className="text-left px-4 py-2.5 font-medium">Satuan</th>
                        <th className="text-left px-4 py-2.5 font-medium">Harga</th>
                        <th className="text-right px-4 py-2.5 font-medium">Subtotal</th>
                    </tr></thead>
                    <tbody>
                        {obatList.length === 0 ? (
                            <tr><td colSpan={6} className="text-center py-8 text-slate-500">Tidak ada obat pada kunjungan ini</td></tr>
                        ) : obatList.map((o, i) => (
                            <tr key={o.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                                <td className="px-4 py-3 text-slate-500">{i + 1}</td>
                                <td className="px-4 py-3 text-white font-medium">{o.nama_obat}</td>
                                <td className="px-4 py-3 text-slate-300">{o.quantity}</td>
                                <td className="px-4 py-3 text-slate-400">{o.satuan}</td>
                                <td className="px-4 py-3 text-emerald-400 font-mono">{formatCurrency(o.harga)}</td>
                                <td className="px-4 py-3 text-emerald-400 font-mono text-right">{formatCurrency((parseInt(o.harga) || 0) * (parseInt(o.quantity) || 1))}</td>
                            </tr>
                        ))}
                    </tbody>
                    {obatList.length > 0 && (
                        <tfoot>
                            <tr className="border-t-2 border-slate-700">
                                <td colSpan={5} className="px-4 py-3 text-right text-white font-semibold">Total</td>
                                <td className="px-4 py-3 text-emerald-400 font-bold font-mono text-right">{formatCurrency(total)}</td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
        </div>
    )
}
