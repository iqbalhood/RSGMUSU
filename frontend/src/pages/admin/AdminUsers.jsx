import React, { useEffect, useState } from 'react'
import { Settings, Plus, Edit, Trash2, Loader2, X } from 'lucide-react'
import api from '@/lib/api'

const EMPTY = { username: '', password: '', akses: '3' }
const AKSES = [
    { value: '1', label: 'Admin' },
    { value: '2', label: 'Dokter / Klinik' },
    { value: '3', label: 'Frontdesk / Kasir / Apotek' },
]

export default function AdminUsers() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState(EMPTY)
    const [editId, setEditId] = useState(null)
    const [saving, setSaving] = useState(false)

    function load() {
        setLoading(true)
        api.get('/users').then(r => setData(r.data.event || [])).catch(() => { }).finally(() => setLoading(false))
    }
    useEffect(() => { load() }, [])

    async function handleSave(e) {
        e.preventDefault(); setSaving(true)
        const payload = { ...form }
        if (!payload.password) delete payload.password // skip if empty on edit
        try {
            editId ? await api.put(`/users/${editId}`, payload) : await api.post('/users', payload)
            setShowForm(false); load()
        } catch (err) { alert(err.response?.data?.message || 'Gagal') }
        finally { setSaving(false) }
    }

    return (
        <div className="p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Settings size={22} /> Users</h2>
                    <p className="text-slate-400 text-sm mt-1">Manajemen akun sistem</p>
                </div>
                <button onClick={() => { setForm(EMPTY); setEditId(null); setShowForm(true) }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                    <Plus size={16} /> User Baru
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-800 text-slate-400">
                        <th className="text-left px-4 py-3 font-medium">Username</th>
                        <th className="text-left px-4 py-3 font-medium">Level Akses</th>
                        <th className="px-4 py-3" />
                    </tr></thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={3} className="text-center py-8 text-slate-500"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={3} className="text-center py-8 text-slate-500">Tidak ada user</td></tr>
                        ) : data.map(u => (
                            <tr key={u.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                <td className="px-4 py-3 text-white font-medium">{u.username}</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs">
                                        {AKSES.find(a => a.value === String(u.akses))?.label || u.akses}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2 justify-end">
                                        <button onClick={() => { setForm({ ...EMPTY, ...u, password: '' }); setEditId(u.id); setShowForm(true) }}
                                            className="text-slate-400 hover:text-blue-400 transition-colors"><Edit size={15} /></button>
                                        <button onClick={async () => { if (!confirm(`Hapus user ${u.username}?`)) return; await api.delete(`/users/${u.id}`); load() }}
                                            className="text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl animate-fadeIn">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                            <h3 className="text-white font-semibold">{editId ? 'Edit' : 'Tambah'} User</h3>
                            <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Username</label>
                                <input value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">
                                    Password {editId && <span className="text-slate-500">(kosongkan jika tidak diubah)</span>}
                                </label>
                                <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Level Akses</label>
                                <select value={form.akses} onChange={e => setForm(f => ({ ...f, akses: e.target.value }))}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {AKSES.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowForm(false)}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-xl text-sm font-medium transition-all">Batal</button>
                                <button type="submit" disabled={saving}
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60">
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
