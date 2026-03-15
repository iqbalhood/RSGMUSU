import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    FileText, Loader2, Save, ChevronDown, ChevronUp, Plus, Trash2,
    Activity, Heart, Eye, Layers, Stethoscope, Pill, ClipboardList, ArrowLeft, Printer,
} from 'lucide-react'

import api from '@/lib/api'
import { formatCurrency } from '@/lib/utils'
import Odontogram from '@/components/Odontogram'

/* ── Helpers ────────────────────────────────────────────────── */
const inputCls = 'w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none'

function Section({ title, icon: Icon, iconColor = 'text-teal-600', children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen)
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-w-0">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center gap-3 px-6 py-4 text-slate-900 font-semibold hover:bg-slate-50 transition-colors min-w-0"
            >
                <Icon size={18} className={iconColor} />
                <span className="flex-1 text-left min-w-0">{title}</span>
                {open ? <ChevronUp size={18} className="text-slate-400 flex-shrink-0" /> : <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />}
            </button>
            {open && <div className="px-6 pb-6 pt-2 border-t border-slate-200 min-w-0">{children}</div>}
        </div>
    )
}

function Field({ label, value, onChange, type = 'text', rows, options }) {
    return (
        <div className="min-w-0">
            {label && <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>}
            {options ? (
                <select value={value} onChange={onChange} className={inputCls}>
                    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            ) : rows ? (
                <textarea value={value} onChange={onChange} rows={rows} className={`${inputCls} resize-none`} />
            ) : (
                <input type={type} value={value} onChange={onChange} className={inputCls} />
            )}
        </div>
    )
}

const STATUS_OPTS = [
    { value: '0', label: 'Tidak' },
    { value: '1', label: 'Ya' },
]

/* ── Main Component ─────────────────────────────────────────── */
export default function KlinikRekamMedis() {
    const { id } = useParams() // id = id_kunjungan
    const navigate = useNavigate()

    const [visit, setVisit] = useState(null)
    const [loading, setLoading] = useState(true)

    /* RM */
    const [rm, setRm] = useState({ amnese: '', diagnosa: '' })
    /* Vital */
    const [vital, setVital] = useState({ kesadaran: '', kondisi_umum: '', tekanan_darah: '', denyut_nadi: '', pernafasan: '', suhu: '' })
    /* Riwayat */
    const [riwayat, setRiwayat] = useState({
        status_jantung: '0', keterangan_jantung: '', status_hipertensi: '0', keterangan_hipertensi: '',
        status_diabetes: '0', keterangan_diabetes: '', status_alergi: '0', keterangan_alergi: '',
        status_asma: '0', keterangan_asma: '', status_hepar: '0', keterangan_hepar: '',
        status_lambung: '0', keterangan_lambung: '', status_lain: '0', keterangan_lain: '',
    })
    /* Perawatan */
    const [perawatanList, setPerawatanList] = useState([])
    const [newPerawatan, setNewPerawatan] = useState({ element: '', diagnosa: '', perawatan: '', icd10: '' })
    /* Layanan visit */
    const [layananVisit, setLayananVisit] = useState([])
    const [layananMaster, setLayananMaster] = useState([])
    const [selectedLayanan, setSelectedLayanan] = useState('')
    /* Obat visit */
    const [obatVisit, setObatVisit] = useState([])
    const [obatMaster, setObatMaster] = useState([])
    const [selectedObat, setSelectedObat] = useState('')
    const [obatQty, setObatQty] = useState('1')

    /* Odontogram */
    const [odontogram, setOdontogram] = useState({})

    const [saving, setSaving] = useState(false)
    const [savingOdonto, setSavingOdonto] = useState(false)

    /* ── Load all data on mount ────────────────── */
    const loadAll = useCallback(async () => {
        setLoading(true)
        try {
            const [visitRes, rmRes, vitalRes, riwayatRes, perawatanRes, layananVisitRes, obatVisitRes, layananMasterRes, obatMasterRes] =
                await Promise.allSettled([
                    api.get(`/kunjungan/${id}`),
                    api.get('/rekam_medis', { params: { id_kunjungan: id } }),
                    api.get('/rekam_medis', { params: { sub: 'vital', id_kunjungan: id } }),
                    api.get('/rekam_medis', { params: { sub: 'riwayat', id_kunjungan: id } }),
                    api.get('/perawatan', { params: { id_kunjungan: id } }),
                    api.get('/layanan/kunjungan', { params: { id_kunjungan: id } }),
                    api.get('/obat/kunjungan', { params: { id_kunjungan: id } }),
                    api.get('/layanan'),
                    api.get('/obat'),
                ])

            if (visitRes.status === 'fulfilled') setVisit(visitRes.value.data)
            if (rmRes.status === 'fulfilled') {
                const d = rmRes.value.data?.event?.[0]
                if (d) setRm({ amnese: d.amnese || '', diagnosa: d.diagnosa || '' })
            }
            if (vitalRes.status === 'fulfilled') {
                const d = vitalRes.value.data?.event?.[0]
                if (d) setVital({ kesadaran: d.kesadaran || '', kondisi_umum: d.kondisi_umum || '', tekanan_darah: d.tekanan_darah || '', denyut_nadi: d.denyut_nadi || '', pernafasan: d.pernafasan || '', suhu: d.suhu || '' })
            }
            if (riwayatRes.status === 'fulfilled') {
                const d = riwayatRes.value.data?.event?.[0]
                if (d) setRiwayat(prev => ({ ...prev, ...Object.fromEntries(Object.entries(d).filter(([k]) => k !== 'id' && k !== 'id_kunjungan' && k !== 'id_antrian' && k !== 'id_pasien').map(([k, v]) => [k, String(v)])) }))
            }
            if (perawatanRes.status === 'fulfilled') setPerawatanList(perawatanRes.value.data?.event || [])
            if (layananVisitRes.status === 'fulfilled') setLayananVisit(layananVisitRes.value.data?.event || [])
            if (obatVisitRes.status === 'fulfilled') setObatVisit(obatVisitRes.value.data?.event || [])
            if (layananMasterRes.status === 'fulfilled') setLayananMaster(layananMasterRes.value.data?.event || [])
            if (obatMasterRes.status === 'fulfilled') setObatMaster(obatMasterRes.value.data?.event || [])
            // Odontogram
            try {
                const odoRes = await api.get('/rekam_medis', { params: { sub: 'odontograma', id_kunjungan: id } })
                const k = odoRes.data?.keterangan
                if (k) setOdontogram(typeof k === 'string' ? JSON.parse(k) : k)
            } catch { }
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => { loadAll() }, [loadAll])

    /* ── Save RM + Vital + Riwayat ─────────────── */
    async function saveRM() {
        setSaving(true)
        try {
            await api.post('/rekam_medis', {
                idKunjungan: id, idAntrian: visit?.id_antrian || '', idPasien: visit?.id_pasien || '',
                idDokter: visit?.id_dokter || '', namaDokter: '', ...rm, cicilan: '0',
            })
            await api.put('/rekam_medis', { sub: 'vital', id_kunjungan: id, id_antrian: visit?.id_antrian || '', id_pasien: String(visit?.id_pasien || ''), ...vital })
            await api.put('/rekam_medis', { sub: 'riwayat', id_kunjungan: id, id_antrian: visit?.id_antrian || '', id_pasien: String(visit?.id_pasien || ''), ...Object.fromEntries(Object.entries(riwayat).map(([k, v]) => [k, k.startsWith('status') ? parseInt(v) : v])) })
            alert('✓ Rekam medis tersimpan')
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal menyimpan RM')
        } finally {
            setSaving(false)
        }
    }

    /* ── Perawatan ─────────────────────────────── */
    async function addPerawatan() {
        if (!newPerawatan.perawatan) return
        await api.post('/perawatan', {
            id_pasien: String(visit?.id_pasien || ''), id_antrian: id, id_klinik: String(visit?.id_klinik || ''),
            id_dokter: String(visit?.id_dokter || ''), nama_dokter: '', ...newPerawatan,
        })
        setNewPerawatan({ element: '', diagnosa: '', perawatan: '', icd10: '' })
        const res = await api.get('/perawatan', { params: { id_kunjungan: id } })
        setPerawatanList(res.data.event || [])
    }

    async function deletePerawatan(pid) {
        if (!confirm('Hapus perawatan ini?')) return
        await api.delete(`/perawatan/${pid}`)
        setPerawatanList(p => p.filter(x => x.id !== pid))
    }

    /* ── Layanan visit ─────────────────────────── */
    async function addLayanan() {
        if (!selectedLayanan) return
        const lv = layananMaster.find(l => String(l.id) === selectedLayanan)
        if (!lv) return
        await api.post('/layanan/kunjungan', {
            id_pasien: String(visit?.id_pasien || ''), nama_pasien: '', id_kunjungan: id,
            id_antrian: visit?.id_antrian || '', nama_layanan: lv.layanan,
            harga_bahan: lv.harga_bahan, harga_layanan: lv.harga_koas,
        })
        setSelectedLayanan('')
        const res = await api.get('/layanan/kunjungan', { params: { id_kunjungan: id } })
        setLayananVisit(res.data.event || [])
    }

    async function deleteLayananVisit(lid) {
        await api.delete(`/layanan/${lid}`, { params: { context: 'kunjungan' } })
        setLayananVisit(l => l.filter(x => x.id !== lid))
    }

    /* ── Obat visit ────────────────────────────── */
    async function addObat() {
        if (!selectedObat) return
        const ov = obatMaster.find(o => String(o.id) === selectedObat)
        if (!ov) return
        await api.post('/obat/kunjungan', {
            id_pasien: String(visit?.id_pasien || ''), nama_pasien: '', id_kunjungan: id,
            id_antrian: visit?.id_antrian || '', id_obat: String(ov.id),
            nama_obat: ov.nama, satuan: ov.satuan, quantity: obatQty, harga: ov.harga,
        })
        setSelectedObat(''); setObatQty('1')
        const res = await api.get('/obat/kunjungan', { params: { id_kunjungan: id } })
        setObatVisit(res.data.event || [])
    }

    async function deleteObatVisit(oid) {
        await api.delete(`/obat/${oid}`, { params: { context: 'kunjungan' } })
        setObatVisit(o => o.filter(x => x.id !== oid))
    }

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-slate-600 p-6">
            <Loader2 className="animate-spin mr-2" /> Memuat rekam medis...
        </div>
    )

    return (
        <div className="p-6 space-y-6 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-6 min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                    <button onClick={() => navigate(-1)} className="text-slate-600 hover:text-slate-900 transition-colors p-1 flex-shrink-0"><ArrowLeft size={20} /></button>
                    <div className="min-w-0">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><FileText size={22} className="text-teal-600" /> Rekam Medis</h2>
                        <p className="text-slate-600 text-sm">Kunjungan: <span className="text-teal-600 font-mono">{id}</span></p>
                    </div>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                    <button onClick={() => window.open(`/cetak/rm/${id}`, '_blank')}
                        className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                        <Printer size={16} /> Cetak RM
                    </button>
                    <button onClick={saveRM} disabled={saving}
                        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {saving ? 'Menyimpan...' : 'Simpan RM'}
                    </button>
                </div>
            </div>

            {/* Anamnese & Diagnosa */}
            <Section title="Anamnese & Diagnosa" icon={FileText} iconColor="text-teal-600" defaultOpen>
                <div className="grid grid-cols-1 gap-6 mt-2 min-w-0">
                    <Field label="Anamnese" value={rm.amnese} onChange={e => setRm(r => ({ ...r, amnese: e.target.value }))} rows={3} />
                    <Field label="Diagnosa" value={rm.diagnosa} onChange={e => setRm(r => ({ ...r, diagnosa: e.target.value }))} rows={3} />
                </div>
            </Section>

            {/* Tanda Vital */}
            <Section title="Tanda Vital" icon={Activity} iconColor="text-teal-600">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-2 min-w-0">
                    {[['kesadaran', 'Kesadaran'], ['kondisi_umum', 'Kondisi Umum'], ['tekanan_darah', 'Tekanan Darah'], ['denyut_nadi', 'Denyut Nadi'], ['pernafasan', 'Pernafasan'], ['suhu', 'Suhu (°C)']].map(([k, l]) => (
                        <Field key={k} label={l} value={vital[k]} onChange={e => setVital(v => ({ ...v, [k]: e.target.value }))} />
                    ))}
                </div>
            </Section>

            {/* Riwayat Penyakit */}
            <Section title="Riwayat Penyakit" icon={Heart} iconColor="text-teal-600">
                <div className="space-y-3 mt-2 min-w-0">
                    {[
                        ['jantung', 'Jantung'], ['hipertensi', 'Hipertensi'], ['diabetes', 'Diabetes'],
                        ['alergi', 'Alergi'], ['asma', 'Asma'], ['hepar', 'Hepar'],
                        ['lambung', 'Lambung'], ['lain', 'Lain-lain'],
                    ].map(([key, label]) => (
                        <div key={key} className="grid grid-cols-3 gap-3 items-start min-w-0">
                            <div className="flex items-center gap-2 pt-2 min-w-0">
                                <span className="text-slate-600 text-sm">{label}</span>
                            </div>
                            <Field label="" value={riwayat[`status_${key}`]}
                                onChange={e => setRiwayat(r => ({ ...r, [`status_${key}`]: e.target.value }))}
                                options={STATUS_OPTS} />
                            <input value={riwayat[`keterangan_${key}`]}
                                onChange={e => setRiwayat(r => ({ ...r, [`keterangan_${key}`]: e.target.value }))}
                                placeholder="Keterangan..."
                                className={inputCls} />
                        </div>
                    ))}
                </div>
            </Section>

            {/* Perawatan */}
            <Section title={`Perawatan (${perawatanList.length})`} icon={Stethoscope} iconColor="text-teal-600">
                <div className="space-y-6 mt-2 min-w-0">
                    <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-200 min-w-0">
                        <p className="text-slate-600 text-xs font-medium uppercase tracking-wide">Tambah Perawatan</p>
                        <div className="grid grid-cols-2 gap-6 min-w-0">
                            <Field label="Elemen Gigi" value={newPerawatan.element} onChange={e => setNewPerawatan(p => ({ ...p, element: e.target.value }))} />
                            <Field label="ICD-10" value={newPerawatan.icd10} onChange={e => setNewPerawatan(p => ({ ...p, icd10: e.target.value }))} />
                            <Field label="Diagnosa" value={newPerawatan.diagnosa} onChange={e => setNewPerawatan(p => ({ ...p, diagnosa: e.target.value }))} />
                            <Field label="Perawatan" value={newPerawatan.perawatan} onChange={e => setNewPerawatan(p => ({ ...p, perawatan: e.target.value }))} />
                        </div>
                        <button onClick={addPerawatan} className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                            <Plus size={15} /> Tambah
                        </button>
                    </div>
                    {perawatanList.length > 0 && (
                        <div className="border border-slate-200 rounded-xl overflow-hidden min-w-0">
                            <table className="w-full text-sm">
                                <thead><tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase">El.</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase">Diagnosa</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase">Perawatan</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase">ICD-10</th>
                                    <th className="px-4 py-3" />
                                </tr></thead>
                                <tbody>
                                    {perawatanList.map(p => (
                                        <tr key={p.id} className="border-b border-slate-200 hover:bg-slate-50">
                                            <td className="px-4 py-3 text-slate-900 font-mono text-xs min-w-0">{p.element}</td>
                                            <td className="px-4 py-3 text-slate-600 min-w-0">{p.diagnosa}</td>
                                            <td className="px-4 py-3 text-slate-900 font-medium min-w-0">{p.perawatan}</td>
                                            <td className="px-4 py-3 text-slate-600 font-mono text-xs min-w-0">{p.icd10}</td>
                                            <td className="px-4 py-3 min-w-0">
                                                <button onClick={() => deletePerawatan(p.id)} className="text-slate-400 hover:text-red-600 transition-colors p-1"><Trash2 size={14} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </Section>

            {/* Layanan per Kunjungan */}
            <Section title={`Layanan Kunjungan (${layananVisit.length})`} icon={ClipboardList} iconColor="text-teal-600">
                <div className="space-y-6 mt-2 min-w-0">
                    <div className="flex gap-6 min-w-0 flex-wrap">
                        <select value={selectedLayanan} onChange={e => setSelectedLayanan(e.target.value)}
                            className={`flex-1 min-w-0 ${inputCls}`}>
                            <option value="">-- Pilih Layanan --</option>
                            {layananMaster.map(l => <option key={l.id} value={String(l.id)}>{l.layanan} ({formatCurrency(l.harga_koas)})</option>)}
                        </select>
                        <button onClick={addLayanan} disabled={!selectedLayanan} className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0">
                            <Plus size={15} /> Tambah
                        </button>
                    </div>
                    {layananVisit.length > 0 && (
                        <div className="border border-slate-200 rounded-xl overflow-hidden min-w-0">
                            <table className="w-full text-sm">
                                <thead><tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase">Layanan</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase">Harga Bahan</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase">Harga Layanan</th>
                                    <th className="px-4 py-3" />
                                </tr></thead>
                                <tbody>
                                    {layananVisit.map(l => (
                                        <tr key={l.id} className="border-b border-slate-200 hover:bg-slate-50">
                                            <td className="px-4 py-3 text-slate-900 font-medium min-w-0">{l.nama_layanan}</td>
                                            <td className="px-4 py-3 text-slate-600 font-mono min-w-0">{formatCurrency(l.harga_bahan)}</td>
                                            <td className="px-4 py-3 text-slate-600 font-mono min-w-0">{formatCurrency(l.harga_layanan)}</td>
                                            <td className="px-4 py-3 min-w-0">
                                                <button onClick={() => deleteLayananVisit(l.id)} className="text-slate-400 hover:text-red-600 transition-colors p-1"><Trash2 size={14} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </Section>

            {/* Obat per Kunjungan */}
            <Section title={`Obat Kunjungan (${obatVisit.length})`} icon={Pill} iconColor="text-teal-600">
                <div className="space-y-6 mt-2 min-w-0">
                    <div className="flex gap-6 flex-wrap min-w-0">
                        <select value={selectedObat} onChange={e => setSelectedObat(e.target.value)}
                            className={`flex-1 min-w-[12rem] ${inputCls}`}>
                            <option value="">-- Pilih Obat --</option>
                            {obatMaster.map(o => <option key={o.id} value={String(o.id)}>{o.nama} ({o.satuan})</option>)}
                        </select>
                        <input type="number" value={obatQty} onChange={e => setObatQty(e.target.value)} min="1"
                            placeholder="Qty" className={`w-20 ${inputCls}`} />
                        <button onClick={addObat} disabled={!selectedObat} className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0">
                            <Plus size={15} /> Tambah
                        </button>
                    </div>
                    {obatVisit.length > 0 && (
                        <div className="border border-slate-200 rounded-xl overflow-hidden min-w-0">
                            <table className="w-full text-sm">
                                <thead><tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase">Obat</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase">Qty</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase">Satuan</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase">Harga</th>
                                    <th className="px-4 py-3" />
                                </tr></thead>
                                <tbody>
                                    {obatVisit.map(o => (
                                        <tr key={o.id} className="border-b border-slate-200 hover:bg-slate-50">
                                            <td className="px-4 py-3 text-slate-900 font-medium min-w-0">{o.nama_obat}</td>
                                            <td className="px-4 py-3 text-slate-600 min-w-0">{o.quantity}</td>
                                            <td className="px-4 py-3 text-slate-600 min-w-0">{o.satuan}</td>
                                            <td className="px-4 py-3 text-slate-600 font-mono min-w-0">{formatCurrency(o.harga)}</td>
                                            <td className="px-4 py-3 min-w-0">
                                                <button onClick={() => deleteObatVisit(o.id)} className="text-slate-400 hover:text-red-600 transition-colors p-1"><Trash2 size={14} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </Section>

            {/* Odontogram */}
            <Section title="Odontogram" icon={Layers} iconColor="text-teal-600">
                <div className="mt-4 space-y-6 min-w-0">
                    <Odontogram value={odontogram} onChange={setOdontogram} />
                    <button
                        onClick={async () => {
                            setSavingOdonto(true)
                            try {
                                await api.put('/rekam_medis', {
                                    sub: 'odontograma',
                                    id_kunjungan: id,
                                    id_antrian: visit?.id_antrian || '',
                                    id_pasien: String(visit?.id_pasien || ''),
                                    keterangan: JSON.stringify(odontogram),
                                })
                                alert('✓ Odontogram tersimpan')
                            } catch (err) {
                                alert(err.response?.data?.message || 'Gagal menyimpan odontogram')
                            } finally { setSavingOdonto(false) }
                        }}
                        disabled={savingOdonto}
                        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    >
                        {savingOdonto ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                        {savingOdonto ? 'Menyimpan...' : 'Simpan Odontogram'}
                    </button>
                </div>
            </Section>
        </div>
    )
}
