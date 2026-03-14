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

    if (loading) return <div className="flex h-64 items-center justify-center text-slate-500"><Loader2 className="animate-spin mr-2" /> Memuat...</div>

    return (
        <div className="p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition-colors"><ArrowLeft size={20} /></button>
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2"><CreditCard size={22} className="text-amber-400" /> Cicilan Pembayaran</h2>
                    <p className="text-slate-400 text-xs font-mono mt-0.5">{id}</p>
                </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                    <p className="text-xs text-slate-400">Total Tagihan</p>
                    <p className="text-xl font-bold text-white mt-1">{formatCurrency(totalBiaya)}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                    <p className="text-xs text-slate-400">Sudah Dibayar</p>
                    <p className="text-xl font-bold text-emerald-400 mt-1">{formatCurrency(totalBayar)}</p>
                </div>
                <div className={`rounded-2xl p-4 border ${lunas ? 'bg-emerald-600/10 border-emerald-600/30' : 'bg-rose-600/10 border-rose-600/30'}`}>
                    <p className="text-xs text-slate-400">Sisa</p>
                    <p className={`text-xl font-bold mt-1 ${lunas ? 'text-emerald-400' : 'text-rose-400'}`}>{formatCurrency(sisa)}</p>
                </div>
            </div>

            {lunas && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-600/10 border border-emerald-600/30 rounded-xl px-4 py-3">
                    <CheckCircle size={18} /> LUNAS
                </div>
            )}

            {/* Add cicilan */}
            {!lunas && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <h3 className="text-white font-semibold mb-4">Tambah Cicilan</h3>
                    <form onSubmit={addCicilan} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Jumlah Bayar (Rp)</label>
                            <input type="number" value={form.pembayaran} onChange={e => setForm(f => ({ ...f, pembayaran: e.target.value }))} required min="1"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Tanggal</label>
                            <input type="date" value={form.tglpembayaran} onChange={e => setForm(f => ({ ...f, tglpembayaran: e.target.value }))}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Keterangan</label>
                            <input value={form.keterangan} onChange={e => setForm(f => ({ ...f, keterangan: e.target.value }))} placeholder="Opsional"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button type="submit" disabled={saving}
                            className="sm:col-span-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-all">
                            {saving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
                            {saving ? 'Menyimpan...' : 'Simpan Cicilan'}
                        </button>
                    </form>
                </div>
            )}

            {/* History */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-800"><p className="text-white font-medium text-sm">Riwayat Cicilan</p></div>
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-800 text-slate-400">
                        <th className="text-left px-4 py-2.5 font-medium">Tanggal</th>
                        <th className="text-left px-4 py-2.5 font-medium">Keterangan</th>
                        <th className="text-right px-4 py-2.5 font-medium">Jumlah</th>
                    </tr></thead>
                    <tbody>
                        {cicilan.length === 0 ? (
                            <tr><td colSpan={3} className="text-center py-8 text-slate-500">Belum ada cicilan</td></tr>
                        ) : cicilan.map(c => (
                            <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                                <td className="px-4 py-3 text-slate-400">{formatDate(c.tanggal)}</td>
                                <td className="px-4 py-3 text-slate-300">{c.keterangan || '-'}</td>
                                <td className="px-4 py-3 text-emerald-400 font-mono text-right">{formatCurrency(c.biaya)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
