import React, { useEffect, useState } from 'react'
import { Pill, Plus, Edit, Trash2, Loader2, X } from 'lucide-react'
import api from '@/lib/api'
import { formatCurrency } from '@/lib/utils'

const EMPTY = { nama: '', quantity: '', satuan: '', harga: '' }

export default function AdminObat() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState(EMPTY)
    const [editId, setEditId] = useState(null)
    const [saving, setSaving] = useState(false)

    function load() {
        setLoading(true)
        api.get('/obat').then(r => setData(r.data.event || [])).catch(() => { }).finally(() => setLoading(false))
    }
    useEffect(() => { load() }, [])

    async function handleSave(e) {
        e.preventDefault(); setSaving(true)
        try {
            editId ? await api.put(`/obat/${editId}`, form) : await api.post('/obat', form)
            setShowForm(false); load()
        } catch (err) { alert(err.response?.data?.message || 'Gagal') }
        finally { setSaving(false) }
    }

    const fields = [
        { key: 'nama', label: 'Nama Obat' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'satuan', label: 'Satuan' },
        { key: 'harga', label: 'Harga', type: 'number' },
    ]

    const inputCls = 'w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none'

    return (
        <div className="p-6 space-y-6 min-w-0">
            <div className="flex items-center justify-between gap-4 min-w-0 flex-wrap">
                <div className="min-w-0">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Pill size={22} className="text-teal-600" /> Data Obat</h2>
                    <p className="text-slate-600 text-sm mt-1">Manajemen master obat</p>
                </div>
                <button onClick={() => { setForm(EMPTY); setEditId(null); setShowForm(true) }}
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0">
                    <Plus size={16} /> Obat Baru
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-w-0">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-200 bg-slate-50">
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Nama Obat</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Qty</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Satuan</th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Harga</th>
                        <th className="px-6 py-4" />
                    </tr></thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-600"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-400">Tidak ada obat</td></tr>
                        ) : data.map(o => (
                            <tr key={o.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-3 text-slate-900 font-medium min-w-0">{o.nama}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{o.quantity}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{o.satuan}</td>
                                <td className="px-6 py-3 text-slate-600 font-mono min-w-0">{formatCurrency(o.harga)}</td>
                                <td className="px-6 py-3 min-w-0">
                                    <div className="flex items-center gap-2 justify-end">
                                        <button onClick={() => { setForm({ ...EMPTY, ...o }); setEditId(o.id); setShowForm(true) }}
                                            className="text-slate-400 hover:text-teal-600 transition-colors p-1"><Edit size={15} /></button>
                                        <button onClick={async () => { if (!confirm(`Hapus ${o.nama}?`)) return; await api.delete(`/obat/${o.id}`); load() }}
                                            className="text-slate-400 hover:text-red-600 transition-colors p-1"><Trash2 size={15} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 min-w-0">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 min-w-0">
                            <h3 className="text-slate-900 font-semibold">{editId ? 'Edit' : 'Tambah'} Obat</h3>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4 min-w-0">
                            {fields.map(({ key, label, type = 'text' }) => (
                                <div key={key} className="min-w-0">
                                    <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                                    <input type={type} value={form[key]}
                                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                        className={inputCls} />
                                </div>
                            ))}
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowForm(false)}
                                    className="flex-1 min-w-0 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-medium transition-all">Batal</button>
                                <button type="submit" disabled={saving}
                                    className="flex-1 min-w-0 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg text-sm font-medium disabled:opacity-60">
                                    {saving && <Loader2 size={16} className="animate-spin" />}
                                    {saving ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
