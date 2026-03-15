import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CreditCard, Loader2, Plus, ArrowLeft, CheckCircle } from 'lucide-react'
import api from '@/lib/api'
import { formatDate, formatCurrency } from '@/lib/utils'

function todayStr() {
    return new Date().toISOString().split('T')[0]
}

export default function KasirCicilan() {
    const { id } = useParams() // id_kunjungan
    const navigate = useNavigate()
    const [visit, setVisit] = useState(null)
    const [cicilan, setCicilan] = useState([])
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({ pembayaran: '', keterangan: '', tglpembayaran: todayStr() })
    const [saving, setSaving] = useState(false)

    async function load() {
        setLoading(true)
        try {
            const [visitRes, cicilanRes] = await Promise.all([
                api.get(`/kunjungan/${id}`),
                api.get('/kasir/cicilan', { params: { id_kunjungan: id } }),
            ])
            setVisit(visitRes.data)
            setCicilan(cicilanRes.data.event || [])
        } catch { } finally { setLoading(false) }
    }

    useEffect(() => { load() }, [id])

    async function addCicilan(e) {
        e.preventDefault()
        if (!form.pembayaran) return
        setSaving(true)
        try {
            await api.post('/kasir/cicilan', { idKunjungan: id, ...form })
            setForm({ pembayaran: '', keterangan: '', tglpembayaran: todayStr() })
            load()
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal menyimpan cicilan')
        } finally { setSaving(false) }
    }

    const totalBiaya = parseInt(visit?.biaya_rekam_medis) || 0
    const totalBayar = cicilan.reduce((s, c) => s + (parseInt(c.biaya) || 0), 0)
    const sisa = totalBiaya - totalBayar
    const lunas = sisa <= 0

    const inputCls = 'w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none'

    if (loading) return <div className="flex h-64 items-center justify-center text-slate-600 p-6"><Loader2 className="animate-spin mr-2" /> Memuat...</div>

    return (
        <div className="p-6 space-y-6 min-w-0">
            <div className="flex items-center gap-3 min-w-0">
                <button onClick={() => navigate(-1)} className="text-slate-600 hover:text-slate-900 transition-colors p-1 flex-shrink-0"><ArrowLeft size={20} /></button>
                <div className="min-w-0">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><CreditCard size={22} className="text-teal-600" /> Cicilan Pembayaran</h2>
                    <p className="text-slate-600 text-xs font-mono mt-0.5">{id}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 min-w-0">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-w-0">
                    <p className="text-xs text-slate-400">Total Tagihan</p>
                    <p className="text-xl font-bold text-slate-900 mt-1">{formatCurrency(totalBiaya)}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-w-0">
                    <p className="text-xs text-slate-400">Sudah Dibayar</p>
                    <p className="text-xl font-bold text-teal-600 mt-1">{formatCurrency(totalBayar)}</p>
                </div>
                <div className={`rounded-xl p-6 border min-w-0 ${lunas ? 'bg-teal-50 border-teal-200' : 'bg-red-50 border-red-200'}`}>
                    <p className="text-xs text-slate-400">Sisa</p>
                    <p className={`text-xl font-bold mt-1 ${lunas ? 'text-teal-600' : 'text-red-600'}`}>{formatCurrency(sisa)}</p>
                </div>
            </div>

            {lunas && (
                <div className="flex items-center gap-2 text-teal-600 text-sm bg-teal-50 border border-teal-200 rounded-lg px-4 py-3 min-w-0">
                    <CheckCircle size={18} /> LUNAS
                </div>
            )}

            {!lunas && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-w-0">
                    <h3 className="text-slate-900 font-semibold mb-4">Tambah Cicilan</h3>
                    <form onSubmit={addCicilan} className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end min-w-0">
                        <div className="min-w-0">
                            <label className="block text-xs font-medium text-slate-600 mb-1">Jumlah Bayar (Rp)</label>
                            <input type="number" value={form.pembayaran} onChange={e => setForm(f => ({ ...f, pembayaran: e.target.value }))} required min="1" className={inputCls} />
                        </div>
                        <div className="min-w-0">
                            <label className="block text-xs font-medium text-slate-600 mb-1">Tanggal</label>
                            <input type="date" value={form.tglpembayaran} onChange={e => setForm(f => ({ ...f, tglpembayaran: e.target.value }))} className={inputCls} />
                        </div>
                        <div className="min-w-0">
                            <label className="block text-xs font-medium text-slate-600 mb-1">Keterangan</label>
                            <input value={form.keterangan} onChange={e => setForm(f => ({ ...f, keterangan: e.target.value }))} placeholder="Opsional" className={inputCls} />
                        </div>
                        <button type="submit" disabled={saving}
                            className="sm:col-span-3 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white py-2.5 rounded-lg text-sm font-medium transition-all min-w-0">
                            {saving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
                            {saving ? 'Menyimpan...' : 'Simpan Cicilan'}
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-w-0">
                <div className="px-6 py-4 border-b border-slate-200 min-w-0"><p className="text-slate-900 font-medium text-sm">Riwayat Cicilan</p></div>
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-200 bg-slate-50">
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Tanggal</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Keterangan</th>
                        <th className="text-right px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Jumlah</th>
                    </tr></thead>
                    <tbody>
                        {cicilan.length === 0 ? (
                            <tr><td colSpan={3} className="text-center py-8 text-slate-400">Belum ada cicilan</td></tr>
                        ) : cicilan.map(c => (
                            <tr key={c.id} className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="px-6 py-3 text-slate-600 min-w-0">{formatDate(c.tanggal)}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{c.keterangan || '-'}</td>
                                <td className="px-6 py-3 text-slate-600 font-mono text-right min-w-0">{formatCurrency(c.biaya)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
