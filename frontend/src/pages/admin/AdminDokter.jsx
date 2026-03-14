import React, { useEffect, useState } from 'react'
import { Stethoscope, Plus, Edit, Trash2, Loader2, X } from 'lucide-react'
import api from '@/lib/api'

const EMPTY = { nama: '', jenis_kelamin: 'L', nomor_hp: '' }

export default function AdminDokter() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState(EMPTY)
    const [editId, setEditId] = useState(null)
    const [saving, setSaving] = useState(false)

    function load() {
        setLoading(true)
        api.get('/dokter').then(r => setData(r.data.event || [])).catch(() => { }).finally(() => setLoading(false))
    }
    useEffect(() => { load() }, [])

    function openNew() { setForm(EMPTY); setEditId(null); setShowForm(true) }
    function openEdit(d) { setForm({ ...EMPTY, ...d }); setEditId(d.id); setShowForm(true) }

    async function handleSave(e) {
        e.preventDefault(); setSaving(true)
        try {
            editId ? await api.put(`/dokter/${editId}`, form) : await api.post('/dokter', form)
            setShowForm(false); load()
        } catch (err) { alert(err.response?.data?.message || 'Gagal') }
        finally { setSaving(false) }
    }

    async function handleDelete(d) {
        if (!confirm(`Hapus dokter ${d.nama}?`)) return
        await api.delete(`/dokter/${d.id}`); load()
    }

    const F = ({ label, name, type = 'text', options }) => (
        <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
            {options ? (
                <select value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            ) : (
                <input type={type} value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            )}
        </div>
    )

    return (
        <div className="p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Stethoscope size={22} /> Data Dokter</h2>
                    <p className="text-slate-400 text-sm mt-1">Manajemen data dokter</p>
                </div>
                <button onClick={openNew} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                    <Plus size={16} /> Dokter Baru
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-800 text-slate-400">
                        <th className="text-left px-4 py-3 font-medium">Nama</th>
                        <th className="text-left px-4 py-3 font-medium">JK</th>
                        <th className="text-left px-4 py-3 font-medium">No. HP</th>
                        <th className="px-4 py-3" />
                    </tr></thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} className="text-center py-8 text-slate-500"><Loader2 className="animate-spin inline" /></td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={4} className="text-center py-8 text-slate-500">Tidak ada dokter</td></tr>
                        ) : data.map(d => (
                            <tr key={d.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                <td className="px-4 py-3 text-white font-medium">{d.nama}</td>
                                <td className="px-4 py-3 text-slate-400">{d.jenis_kelamin}</td>
                                <td className="px-4 py-3 text-slate-400">{d.nomor_hp}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2 justify-end">
                                        <button onClick={() => openEdit(d)} className="text-slate-400 hover:text-blue-400 transition-colors"><Edit size={15} /></button>
                                        <button onClick={() => handleDelete(d)} className="text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
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
                            <h3 className="text-white font-semibold">{editId ? 'Edit' : 'Tambah'} Dokter</h3>
                            <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white transition-colors"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <F label="Nama Lengkap" name="nama" />
                            <F label="No. HP" name="nomor_hp" />
                            <F label="Jenis Kelamin" name="jenis_kelamin"
                                options={[{ value: 'L', label: 'Laki-laki' }, { value: 'P', label: 'Perempuan' }]} />
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowForm(false)}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-xl text-sm font-medium transition-all">Batal</button>
                                <button type="submit" disabled={saving}
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-60">
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
