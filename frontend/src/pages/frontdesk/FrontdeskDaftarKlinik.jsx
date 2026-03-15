import React, { useEffect, useState } from 'react'
import { ClipboardList, Search, Loader2, CheckCircle, ChevronRight, User, Stethoscope } from 'lucide-react'
import api from '@/lib/api'

const KLINIK_LIST = [
    { id: 1, label: 'IKGP' },
    { id: 2, label: 'Periodonsia' },
    { id: 3, label: 'IPM (Ilmu Penyakit Mulut)' },
    { id: 4, label: 'IKGA' },
    { id: 5, label: 'Konservasi' },
    { id: 6, label: 'Prostodonsia' },
    { id: 7, label: 'Bedah Mulut' },
    { id: 8, label: 'Ortodonsia' },
    { id: 9, label: 'Radiologi' },
]

function generateAntrianId(klinikId) {
    const prefix = KLINIK_LIST.find(k => k.id === klinikId)?.label.slice(0, 3).toUpperCase() || 'KL'
    return `${prefix}${Date.now().toString().slice(-6)}`
}

export default function FrontdeskDaftarKlinik() {
    // Step 1: temukan pasien
    const [step, setStep] = useState(1)
    const [keyword, setKeyword] = useState('')
    const [pasienList, setPasienList] = useState([])
    const [searching, setSearching] = useState(false)
    const [selectedPasien, setSelectedPasien] = useState(null)

    // Step 2: pilih klinik + dokter
    const [selectedKlinik, setSelectedKlinik] = useState(null)
    const [dokterList, setDokterList] = useState([])
    const [selectedDokter, setSelectedDokter] = useState(null)
    const [dokterPendamping, setDokterPendamping] = useState('')

    // Step 3: konfirmasi + submit
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(null)

    async function searchPasien() {
        if (!keyword.trim()) return
        setSearching(true)
        try {
            const { data } = await api.get('/pasien', { params: { search: keyword } })
            setPasienList(data.event || [])
        } catch {
            setPasienList([])
        } finally {
            setSearching(false)
        }
    }

    function selectPasien(p) {
        setSelectedPasien(p)
        setStep(2)
        setSelectedKlinik(null)
        setSelectedDokter(null)
    }

    useEffect(() => {
        if (step === 2) {
            api.get('/dokter').then(r => setDokterList(r.data.event || [])).catch(() => { })
        }
    }, [step])

    async function handleSubmit() {
        if (!selectedPasien || !selectedKlinik || !selectedDokter) return
        setSubmitting(true)
        try {
            const idAntrian = generateAntrianId(selectedKlinik.id)
            const idKunjungan = `KJ${Date.now()}`
            await api.post('/kunjungan', {
                idKunjungan,
                idAntrian,
                idKlinik: selectedKlinik.id,
                dokterPendamping: dokterPendamping || '',
                idDokter: selectedDokter.id,
                idPasien: selectedPasien.id,
            })
            setSubmitted({ idKunjungan, idAntrian, pasien: selectedPasien, klinik: selectedKlinik, dokter: selectedDokter })
            setStep(3)
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal mendaftarkan ke klinik')
        } finally {
            setSubmitting(false)
        }
    }

    function reset() {
        setStep(1)
        setKeyword('')
        setPasienList([])
        setSelectedPasien(null)
        setSelectedKlinik(null)
        setSelectedDokter(null)
        setDokterPendamping('')
        setSubmitted(null)
    }

    const inputCls = 'w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none placeholder:text-slate-400'

    return (
        <div className="p-6 space-y-6 min-w-0">
            <div className="min-w-0">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><ClipboardList size={22} className="text-teal-600" /> Daftar ke Klinik</h2>
                <p className="text-slate-600 text-sm mt-1">Daftarkan pasien ke antrian klinik</p>
            </div>

            {/* Progress steps */}
            <div className="flex items-center gap-2 text-sm flex-wrap min-w-0">
                {['Cari Pasien', 'Pilih Klinik & Dokter', 'Konfirmasi'].map((s, i) => (
                    <React.Fragment key={s}>
                        <div className={`flex items-center gap-1.5 min-w-0 ${step > i + 1 ? 'text-teal-600' : step === i + 1 ? 'text-slate-900' : 'text-slate-400'}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step > i + 1 ? 'bg-teal-600 text-white' : step === i + 1 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                {step > i + 1 ? '✓' : i + 1}
                            </span>
                            <span className="hidden sm:inline">{s}</span>
                        </div>
                        {i < 2 && <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />}
                    </React.Fragment>
                ))}
            </div>

            {/* Step 1: Search Pasien */}
            {step === 1 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6 min-w-0">
                    <h3 className="text-slate-900 font-semibold flex items-center gap-2"><User size={18} className="text-teal-600" /> Cari Pasien</h3>
                    <div className="flex gap-6 min-w-0 flex-wrap">
                        <div className="relative flex-1 min-w-0">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                value={keyword}
                                onChange={e => setKeyword(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && searchPasien()}
                                placeholder="Cari nama atau no. rekam medis..."
                                className={inputCls + ' pl-11'}
                            />
                        </div>
                        <button
                            onClick={searchPasien}
                            disabled={searching}
                            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-60 flex-shrink-0"
                        >
                            {searching ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
                            Cari
                        </button>
                    </div>

                    {pasienList.length > 0 && (
                        <div className="border border-slate-200 rounded-xl overflow-hidden min-w-0">
                            {pasienList.map((p, i) => (
                                <button
                                    key={p.id}
                                    onClick={() => selectPasien(p)}
                                    className={`w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors text-left min-w-0 ${i > 0 ? 'border-t border-slate-200' : ''}`}
                                >
                                    <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-sm font-bold flex-shrink-0">
                                        {p.nama?.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-slate-900 font-medium truncate">{p.nama}</p>
                                        <p className="text-slate-600 text-xs font-mono truncate">{p.no_rekam_medis}</p>
                                    </div>
                                    <span className="text-xs text-slate-400 flex-shrink-0">{p.cara_bayar}</span>
                                    <ChevronRight size={16} className="text-slate-400 flex-shrink-0" />
                                </button>
                            ))}
                        </div>
                    )}
                    {!searching && pasienList.length === 0 && keyword && (
                        <p className="text-slate-600 text-sm text-center py-4">Pasien tidak ditemukan. <a href="/frontdesk/pasien" className="text-teal-600 hover:underline font-medium">Tambah pasien baru?</a></p>
                    )}
                </div>
            )}

            {/* Step 2: Pilih Klinik + Dokter */}
            {step === 2 && selectedPasien && (
                <div className="space-y-6 min-w-0">
                    {/* Pasien info */}
                    <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold flex-shrink-0">
                            {selectedPasien.nama?.charAt(0)}
                        </div>
                        <div className="min-w-0">
                            <p className="text-slate-900 font-semibold truncate">{selectedPasien.nama}</p>
                            <p className="text-slate-600 text-xs font-mono">{selectedPasien.no_rekam_medis} · {selectedPasien.cara_bayar}</p>
                        </div>
                    </div>

                    {/* Pilih klinik */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-3 min-w-0">
                        <h3 className="text-slate-900 font-semibold flex items-center gap-2"><Hospital size={18} className="text-teal-600" /> Pilih Klinik</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 min-w-0">
                            {KLINIK_LIST.map(k => (
                                <button
                                    key={k.id}
                                    onClick={() => setSelectedKlinik(k)}
                                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left min-w-0 ${selectedKlinik?.id === k.id ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'}`}
                                >
                                    {k.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Pilih dokter */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-3 min-w-0">
                        <h3 className="text-slate-900 font-semibold flex items-center gap-2"><Stethoscope size={18} className="text-teal-600" /> Pilih Dokter</h3>
                        {dokterList.length === 0 ? (
                            <p className="text-slate-600 text-sm">Tidak ada dokter tersedia</p>
                        ) : (
                            <div className="grid gap-3 min-w-0">
                                {dokterList.map(d => (
                                    <button
                                        key={d.id}
                                        onClick={() => setSelectedDokter(d)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all text-left min-w-0 ${selectedDokter?.id === d.id ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${selectedDokter?.id === d.id ? 'bg-white/20' : 'bg-slate-200'}`}>
                                            {d.nama?.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium truncate">{d.nama}</p>
                                            <p className={`text-xs ${selectedDokter?.id === d.id ? 'text-white/80' : 'text-slate-500'}`}>drg.</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="mt-4 min-w-0">
                            <label className="block text-xs font-medium text-slate-600 mb-1">Dokter Pendamping (opsional)</label>
                            <input
                                value={dokterPendamping}
                                onChange={e => setDokterPendamping(e.target.value)}
                                placeholder="Nama dokter pendamping..."
                                className={inputCls}
                            />
                        </div>
                    </div>

                    <div className="flex gap-6 min-w-0 flex-wrap">
                        <button onClick={() => setStep(1)} className="flex-1 min-w-0 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-medium transition-all">
                            ← Kembali
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedKlinik || !selectedDokter || submitting}
                            className="flex-1 min-w-0 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all"
                        >
                            {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                            {submitting ? 'Mendaftarkan...' : 'Daftar ke Klinik →'}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Sukses */}
            {step === 3 && submitted && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center space-y-6 min-w-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-2">
                        <CheckCircle size={36} className="text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Pendaftaran Berhasil!</h3>
                    <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2 max-w-sm mx-auto border border-slate-200 min-w-0">
                        <Row label="Pasien" value={submitted.pasien.nama} />
                        <Row label="No. RM" value={submitted.pasien.no_rekam_medis} mono />
                        <Row label="Klinik" value={submitted.klinik.label} />
                        <Row label="Dokter" value={submitted.dokter.nama} />
                        <Row label="No. Antrian" value={submitted.idAntrian} mono highlight />
                        <Row label="No. Kunjungan" value={submitted.idKunjungan} mono />
                    </div>
                    <div className="flex gap-3 justify-center pt-2">
                        <button onClick={reset} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                            Daftar Lagi
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

function Row({ label, value, mono, highlight }) {
    return (
        <div className="flex items-center justify-between gap-4 min-w-0">
            <span className="text-slate-600 text-sm flex-shrink-0">{label}</span>
            <span className={`text-sm font-medium truncate min-w-0 ${highlight ? 'text-teal-600' : 'text-slate-900'} ${mono ? 'font-mono' : ''}`}>{value}</span>
        </div>
    )
}

const Hospital = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 6v4" /><path d="M14 14h-4" /><path d="M14 18h-4" /><path d="M14 8h-4" /><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
        <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
    </svg>
)
