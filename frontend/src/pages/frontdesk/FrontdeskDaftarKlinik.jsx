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

    return (
        <div className="p-6 space-y-6 animate-fadeIn">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><ClipboardList size={22} className="text-blue-400" /> Daftar ke Klinik</h2>
                <p className="text-slate-400 text-sm mt-1">Daftarkan pasien ke antrian klinik</p>
            </div>

            {/* Progress steps */}
            <div className="flex items-center gap-2 text-sm">
                {['Cari Pasien', 'Pilih Klinik & Dokter', 'Konfirmasi'].map((s, i) => (
                    <React.Fragment key={s}>
                        <div className={`flex items-center gap-1.5 ${step > i + 1 ? 'text-emerald-400' : step === i + 1 ? 'text-white' : 'text-slate-600'}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step > i + 1 ? 'bg-emerald-500' : step === i + 1 ? 'bg-blue-600' : 'bg-slate-800'}`}>
                                {step > i + 1 ? '✓' : i + 1}
                            </span>
                            <span className="hidden sm:inline">{s}</span>
                        </div>
                        {i < 2 && <ChevronRight size={14} className="text-slate-700 flex-shrink-0" />}
                    </React.Fragment>
                ))}
            </div>

            {/* Step 1: Search Pasien */}
            {step === 1 && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 className="text-white font-semibold flex items-center gap-2"><User size={18} className="text-blue-400" /> Cari Pasien</h3>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                value={keyword}
                                onChange={e => setKeyword(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && searchPasien()}
                                placeholder="Cari nama atau no. rekam medis..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
                            />
                        </div>
                        <button
                            onClick={searchPasien}
                            disabled={searching}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
                        >
                            {searching ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
                            Cari
                        </button>
                    </div>

                    {pasienList.length > 0 && (
                        <div className="border border-slate-800 rounded-xl overflow-hidden">
                            {pasienList.map((p, i) => (
                                <button
                                    key={p.id}
                                    onClick={() => selectPasien(p)}
                                    className={`w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-800 transition-colors text-left ${i > 0 ? 'border-t border-slate-800' : ''}`}
                                >
                                    <div className="w-9 h-9 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm font-bold flex-shrink-0">
                                        {p.nama?.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate">{p.nama}</p>
                                        <p className="text-slate-500 text-xs font-mono">{p.no_rekam_medis}</p>
                                    </div>
                                    <span className="text-xs text-slate-500 flex-shrink-0">{p.cara_bayar}</span>
                                    <ChevronRight size={16} className="text-slate-600 flex-shrink-0" />
                                </button>
                            ))}
                        </div>
                    )}
                    {!searching && pasienList.length === 0 && keyword && (
                        <p className="text-slate-500 text-sm text-center py-4">Pasien tidak ditemukan. <a href="/frontdesk/pasien" className="text-blue-400 hover:underline">Tambah pasien baru?</a></p>
                    )}
                </div>
            )}

            {/* Step 2: Pilih Klinik + Dokter */}
            {step === 2 && selectedPasien && (
                <div className="space-y-4">
                    {/* Pasien info */}
                    <div className="bg-blue-600/10 border border-blue-600/30 rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold">
                            {selectedPasien.nama?.charAt(0)}
                        </div>
                        <div>
                            <p className="text-white font-semibold">{selectedPasien.nama}</p>
                            <p className="text-slate-400 text-xs font-mono">{selectedPasien.no_rekam_medis} · {selectedPasien.cara_bayar}</p>
                        </div>
                    </div>

                    {/* Pilih klinik */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                        <h3 className="text-white font-semibold flex items-center gap-2"><Hospital size={18} className="text-emerald-400" /> Pilih Klinik</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {KLINIK_LIST.map(k => (
                                <button key={k.id} onClick={() => setSelectedKlinik(k)}
                                    className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${selectedKlinik?.id === k.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                                    {k.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Pilih dokter */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                        <h3 className="text-white font-semibold flex items-center gap-2"><Stethoscope size={18} className="text-violet-400" /> Pilih Dokter</h3>
                        {dokterList.length === 0 ? (
                            <p className="text-slate-500 text-sm">Tidak ada dokter tersedia</p>
                        ) : (
                            <div className="grid gap-2">
                                {dokterList.map(d => (
                                    <button key={d.id} onClick={() => setSelectedDokter(d)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all text-left ${selectedDokter?.id === d.id ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${selectedDokter?.id === d.id ? 'bg-white/20' : 'bg-slate-700'}`}>
                                            {d.nama?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium">{d.nama}</p>
                                            <p className={`text-xs ${selectedDokter?.id === d.id ? 'text-white/70' : 'text-slate-500'}`}>drg.</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="mt-4">
                            <label className="block text-xs font-medium text-slate-400 mb-1">Dokter Pendamping (opsional)</label>
                            <input
                                value={dokterPendamping}
                                onChange={e => setDokterPendamping(e.target.value)}
                                placeholder="Nama dokter pendamping..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => setStep(1)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl text-sm font-medium transition-all">
                            ← Kembali
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedKlinik || !selectedDokter || submitting}
                            className="flex-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-600/20"
                        >
                            {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                            {submitting ? 'Mendaftarkan...' : 'Dafter ke Klinik →'}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Sukses */}
            {step === 3 && submitted && (
                <div className="bg-slate-900 border border-emerald-600/30 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 rounded-full mb-2">
                        <CheckCircle size={36} className="text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Pendaftaran Berhasil!</h3>
                    <div className="bg-slate-800 rounded-xl p-4 text-left space-y-2 max-w-sm mx-auto">
                        <Row label="Pasien" value={submitted.pasien.nama} />
                        <Row label="No. RM" value={submitted.pasien.no_rekam_medis} mono />
                        <Row label="Klinik" value={submitted.klinik.label} />
                        <Row label="Dokter" value={submitted.dokter.nama} />
                        <Row label="No. Antrian" value={submitted.idAntrian} mono highlight />
                        <Row label="No. Kunjungan" value={submitted.idKunjungan} mono />
                    </div>
                    <div className="flex gap-3 justify-center pt-2">
                        <button onClick={reset} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all">
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
        <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500 text-sm flex-shrink-0">{label}</span>
            <span className={`text-sm font-medium truncate ${highlight ? 'text-emerald-400' : 'text-white'} ${mono ? 'font-mono' : ''}`}>{value}</span>
        </div>
    )
}

const Hospital = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 6v4" /><path d="M14 14h-4" /><path d="M14 18h-4" /><path d="M14 8h-4" /><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
        <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
    </svg>
)
