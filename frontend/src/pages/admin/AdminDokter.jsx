import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import api from '@/lib/api'
import PageHeader from '@/components/ui/PageHeader'
import DataTable from '@/components/ui/DataTable'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import FormField from '@/components/ui/FormField'
import Badge from '@/components/ui/Badge'

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
        api.get('/dokter')
            .then(r => setData(r.data.event || []))
            .catch(() => { })
            .finally(() => setLoading(false))
    }

    useEffect(() => { load() }, [])

    function openNew() { setForm(EMPTY); setEditId(null); setShowForm(true) }
    function openEdit(d) { setForm({ ...EMPTY, ...d }); setEditId(d.id); setShowForm(true) }

    async function handleSave(e) {
        e.preventDefault(); setSaving(true)
        try {
            editId ? await api.put(`/dokter/${editId}`, form) : await api.post('/dokter', form)
            setShowForm(false); load()
        } catch (err) { alert(err.response?.data?.message || 'Gagal menyimpan') }
        finally { setSaving(false) }
    }

    async function handleDelete(d) {
        if (!confirm(`Hapus dokter ${d.nama}?`)) return
        await api.delete(`/dokter/${d.id}`); load()
    }

    const columns = [
        { header: 'Nama Lengkap', key: 'nama', cellClassName: 'font-medium text-slate-900' },
        {
            header: 'Jenis Kelamin',
            key: 'jenis_kelamin',
            cell: (row) => (
                <Badge variant={row.jenis_kelamin === 'L' ? 'info' : 'warning'}>
                    {row.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                </Badge>
            )
        },
        { header: 'Nomor HP', key: 'nomor_hp' },
        {
            header: '',
            key: 'actions',
            className: 'w-20',
            cell: (row) => (
                <div className="flex items-center gap-1 justify-end">
                    <Button
                        size="sm"
                        variant="ghost"
                        icon={Edit}
                        onClick={() => openEdit(row)}
                        className="text-slate-400 hover:text-teal-600 hover:bg-teal-50"
                    />
                    <Button
                        size="sm"
                        variant="ghost"
                        icon={Trash2}
                        onClick={() => handleDelete(row)}
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                    />
                </div>
            )
        }
    ]

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title="Data Dokter"
                subtitle="Daftar seluruh dokter spesialis yang terregistrasi di RSGM USU."
                actions={
                    <Button icon={Plus} size="sm" onClick={openNew}>
                        Tambah Dokter
                    </Button>
                }
            />

            <div className="p-6">
                <DataTable
                    columns={columns}
                    data={data}
                    loading={loading}
                    emptyText="Tidak ada data dokter ditemukan."
                />
            </div>

            <Modal
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                title={editId ? 'Edit Dokter' : 'Tambah Dokter Baru'}
                description="Lengkapi data dokter yang akan disimpan pada sistem."
                footer={
                    <div className="flex gap-2 w-full">
                        <Button variant="secondary" className="flex-1" onClick={() => setShowForm(false)}>
                            Batal
                        </Button>
                        <Button variant="primary" className="flex-1" loading={saving} onClick={handleSave}>
                            Simpan
                        </Button>
                    </div>
                }
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <FormField
                        label="Nama Lengkap"
                        value={form.nama}
                        onChange={e => setForm(f => ({ ...f, nama: e.target.value }))}
                        required
                    />
                    <FormField
                        label="Nomor HP"
                        value={form.nomor_hp}
                        onChange={e => setForm(f => ({ ...f, nomor_hp: e.target.value }))}
                        required
                    />
                    <FormField
                        label="Jenis Kelamin"
                        as="select"
                        value={form.jenis_kelamin}
                        onChange={e => setForm(f => ({ ...f, jenis_kelamin: e.target.value }))}
                    >
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </FormField>
                </form>
            </Modal>
        </div>
    )
}
