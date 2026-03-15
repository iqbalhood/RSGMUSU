import React, { useEffect, useState } from 'react'
import { Plus, Search, Edit, Trash2, Loader2, Users, X } from 'lucide-react'
import api from '@/lib/api'
import { formatDate } from '@/lib/utils'

const EMPTY_FORM = {
    no_rekam_medis: '',
    nama: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: 'L',
    agama: '',
    alamat: '',
    nomor_hp: '',
    cara_bayar: 'Umum',
    alergi: '',
    catatan: '',
}

export default function FrontdeskPasien() {
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState(EMPTY_FORM)
    const [editId, setEditId] = useState(null)
    const [saving, setSaving] = useState(false)

    function loadPatients() {
        setLoading(true)
        api.get('/pasien', { params: { search } })
            .then(({ data }) => setPatients(data.event || []))
            .catch(() => { })
            .finally(() => setLoading(false))
    }

    useEffect(() => { loadPatients() }, [search])

    function openNew() {
        setForm(EMPTY_FORM)
        setEditId(null)
        setShowForm(true)
    }

    function openEdit(p) {
        setForm({ ...EMPTY_FORM, ...p })
        setEditId(p.id)
        setShowForm(true)
    }

    async function handleSave(e) {
        e.preventDefault()
        setSaving(true)
        try {
            if (editId) {
                await api.put(`/pasien/${editId}`, form)
            } else {
                await api.post('/pasien', form)
            }
            setShowForm(false)
            loadPatients()
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal menyimpan data')
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(p) {
        if (!confirm(`Hapus pasien ${p.nama}?`)) return
        await api.delete(`/pasien/${p.id}`)
        loadPatients()
    }

    const inputCls = 'w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none placeholder:text-slate-400'
    const F = ({ label, name, type = 'text', options }) => (
        <div className="min-w-0">
            <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
            {options ? (
                <select
                    value={form[name]}
                    onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
                    className={inputCls}
                >
                    {options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
            ) : (
                <input
                    type={type}
                    value={form[name]}
                    onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
                    className={inputCls}
                />
            )}
        </div>
    )

    return (
        <div className="p-6 space-y-6 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 min-w-0 flex-wrap">
                <div className="min-w-0">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Users size={22} className="text-teal-600" /> Data Pasien</h2>
                    <p className="text-slate-600 text-sm mt-1">Manajemen data pasien RSGM USU</p>
                </div>
                <button onClick={openNew} className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0">
                    <Plus size={16} /> Pasien Baru
                </button>
            </div>

            {/* Search */}
            <div className="relative min-w-0">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama atau no. rekam medis..."
                    className="w-full border border-slate-300 rounded-lg pl-11 pr-4 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none placeholder:text-slate-400"
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-w-0">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">No. RM</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Nama</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Tgl Lahir</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">No. HP</th>
                            <th className="text-left px-6 py-4 font-semibold text-slate-600 text-xs uppercase">Cara Bayar</th>
                            <th className="px-6 py-4" />
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} className="text-center py-8 text-slate-600"><Loader2 size={20} className="animate-spin inline" /></td></tr>
                        ) : patients.length === 0 ? (
                            <tr><td colSpan={6} className="text-center py-8 text-slate-400">Tidak ada data pasien</td></tr>
                        ) : patients.map((p) => (
                            <tr key={p.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-3 text-slate-900 font-mono text-xs min-w-0">{p.no_rekam_medis}</td>
                                <td className="px-6 py-3 text-slate-900 font-medium min-w-0">{p.nama}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{formatDate(p.tanggal_lahir)}</td>
                                <td className="px-6 py-3 text-slate-600 min-w-0">{p.nomor_hp}</td>
                                <td className="px-6 py-3 min-w-0"><span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">{p.cara_bayar}</span></td>
                                <td className="px-6 py-3 min-w-0">
                                    <div className="flex items-center gap-2 justify-end">
                                        <button onClick={() => openEdit(p)} className="text-slate-400 hover:text-teal-600 transition-colors p-1"><Edit size={15} /></button>
                                        <button onClick={() => handleDelete(p)} className="text-slate-400 hover:text-red-600 transition-colors p-1"><Trash2 size={15} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-slate-200 max-h-[90vh] flex flex-col min-w-0">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 flex-shrink-0 min-w-0">
                            <h3 className="text-slate-900 font-semibold">{editId ? 'Edit Pasien' : 'Pasien Baru'}</h3>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-lg hover:bg-slate-100"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 min-w-0">
                            <div className="grid grid-cols-2 gap-6">
                                <F label="No. Rekam Medis" name="no_rekam_medis" />
                                <F label="Nama Lengkap" name="nama" />
                                <F label="Tempat Lahir" name="tempat_lahir" />
                                <F label="Tanggal Lahir" name="tanggal_lahir" type="date" />
                                <F label="Jenis Kelamin" name="jenis_kelamin" options={['L', 'P']} />
                                <F label="Agama" name="agama" />
                                <F label="No. HP" name="nomor_hp" />
                                <F label="Cara Bayar" name="cara_bayar" options={['Umum', 'BPJS', 'Asuransi']} />
                            </div>
                            <F label="Alamat" name="alamat" />
                            <F label="Alergi" name="alergi" />
                            <F label="Catatan" name="catatan" />

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-medium transition-all min-w-0">
                                    Batal
                                </button>
                                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-60 min-w-0">
                                    {saving ? <Loader2 size={16} className="animate-spin" /> : null}
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
