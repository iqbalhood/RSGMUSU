import React, { useEffect, useState } from 'react'
import { BarChart3, Users, Hospital, Activity, TrendingUp, Loader2, RefreshCw, Download } from 'lucide-react'
import api from '@/lib/api'
import { formatCurrency } from '@/lib/utils'

/* ── Mini SVG Bar Chart ─────────────────────────── */
function BarChart({ data, color = '#3b82f6', height = 120 }) {
    if (!data || data.length === 0) return <div className="text-slate-600 text-xs text-center py-8">Tidak ada data</div>

    const max = Math.max(...data.map(d => d.count), 1)
    const barW = Math.max(4, Math.floor(400 / data.length) - 2)

    return (
        <div className="overflow-x-auto">
            <div style={{ minWidth: data.length * (barW + 2) + 'px' }}>
                <svg width="100%" height={height + 30} viewBox={`0 0 ${data.length * (barW + 2)} ${height + 30}`} preserveAspectRatio="none">
                    {data.map((d, i) => {
                        const barH = max > 0 ? (d.count / max) * height : 0
                        const x = i * (barW + 2)
                        const y = height - barH
                        return (
                            <g key={d.date || d.klinik}>
                                <rect x={x} y={y} width={barW} height={barH} rx="2" fill={color} fillOpacity="0.85" className="transition-all duration-300" />
                                {d.count > 0 && (
                                    <text x={x + barW / 2} y={y - 3} textAnchor="middle" fill="#94a3b8" fontSize="8">{d.count}</text>
                                )}
                            </g>
                        )
                    })}
                </svg>
                {/* X-axis labels — show every Nth label */}
                <div className="flex" style={{ marginTop: '-4px' }}>
                    {data.map((d, i) => {
                        const label = d.date
                            ? new Date(d.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
                            : d.klinik
                        const show = data.length <= 14 || i % Math.ceil(data.length / 10) === 0
                        return (
                            <div
                                key={d.date || d.klinik}
                                className={`text-center text-slate-600 overflow-hidden ${show ? '' : 'invisible'}`}
                                style={{ fontSize: '8px', lineHeight: '12px', width: (barW + 2) + 'px', flexShrink: 0 }}
                            >
                                {label}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

/* ── Horizontal Bar (for klinik ranking) ────────── */
function HBarChart({ data, color = '#8b5cf6' }) {
    if (!data || data.length === 0) return <div className="text-slate-600 text-xs text-center py-4">Tidak ada data</div>
    const max = Math.max(...data.map(d => d.count), 1)
    return (
        <div className="space-y-2">
            {data.map((d, i) => (
                <div key={d.id} className="flex items-center gap-3">
                    <div className="w-28 text-right text-xs text-slate-400 truncate flex-shrink-0">{d.klinik}</div>
                    <div className="flex-1 h-6 bg-slate-800 rounded-lg overflow-hidden">
                        <div
                            className="h-full rounded-lg transition-all duration-500 flex items-center pl-2"
                            style={{ width: `${(d.count / max) * 100}%`, backgroundColor: color, minWidth: d.count > 0 ? '24px' : '0' }}
                        >
                            {d.count > 0 && <span className="text-white text-xs font-bold">{d.count}</span>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

/* ── Stat Card ───────────────────────────────────── */
function StatCard({ label, value, icon: Icon, color, sub }) {
    return (
        <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4`}>
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={22} className="text-white" />
            </div>
            <div className="min-w-0">
                <p className="text-2xl font-bold text-white truncate">{value ?? <span className="text-slate-600">—</span>}</p>
                <p className="text-slate-400 text-sm">{label}</p>
                {sub && <p className="text-slate-600 text-xs mt-0.5">{sub}</p>}
            </div>
        </div>
    )
}

export default function AdminLaporan() {
    const [period, setPeriod] = useState('30')
    const [summary, setSummary] = useState(null)
    const [daily, setDaily] = useState([])
    const [klinik, setKlinik] = useState([])
    const [loading, setLoading] = useState(true)

    async function loadAll(days = period) {
        setLoading(true)
        try {
            const [sumRes, dailyRes, klinikRes] = await Promise.all([
                api.get('/laporan', { params: { type: 'summary' } }),
                api.get('/laporan', { params: { type: 'daily', days } }),
                api.get('/laporan', { params: { type: 'klinik', days } }),
            ])
            setSummary(sumRes.data)
            setDaily(dailyRes.data.event || [])
            setKlinik(klinikRes.data.event || [])
        } catch { } finally { setLoading(false) }
    }

    useEffect(() => { loadAll() }, [])

    function changePeriod(d) {
        setPeriod(d)
        loadAll(d)
    }

    return (
        <div className="p-6 space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2"><BarChart3 size={22} className="text-blue-400" /> Laporan & Statistik</h2>
                    <p className="text-slate-400 text-sm mt-1">Ringkasan aktivitas sistem</p>
                </div>
                <div className="flex items-center gap-2">
                    {['7', '30', '90'].map(d => (
                        <button key={d} onClick={() => changePeriod(d)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${period === d ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                            {d} hari
                        </button>
                    ))}
                    <button onClick={() => window.open(`/api/laporan/export?tawal=${new Date(Date.now() - parseInt(period) * 864e5).toISOString().split('T')[0]}&takhir=${new Date().toISOString().split('T')[0]}`, '_blank')} className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm transition-all shadow-md ml-2">
                        <Download size={14} /> Export CSV
                    </button>
                    <button onClick={() => loadAll()} className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-all ml-1">
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            {loading && !summary ? (
                <div className="flex items-center justify-center py-20 text-slate-500">
                    <Loader2 className="animate-spin mr-2" /> Memuat data...
                </div>
            ) : (
                <>
                    {/* Summary cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard label="Total Pasien" value={summary?.totalPasien?.toLocaleString()} icon={Users} color="bg-blue-600" />
                        <StatCard label="Kunjungan Bulan Ini" value={summary?.kunjunganBulanIni} icon={Hospital} color="bg-emerald-600" />
                        <StatCard label="Kunjungan Hari Ini" value={summary?.kunjunganHariIni} icon={Activity} color="bg-violet-600" sub={`${summary?.kunjunganMenunggu} menunggu`} />
                        <StatCard label="Pendapatan Bulan Ini" value={formatCurrency(summary?.pendapatanBulanIni)} icon={TrendingUp} color="bg-amber-600" />
                    </div>

                    {/* Charts row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Daily visits chart */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                            <h3 className="text-white font-semibold mb-1">Kunjungan Harian</h3>
                            <p className="text-slate-500 text-xs mb-4">{period} hari terakhir</p>
                            {loading ? (
                                <div className="flex items-center justify-center h-32 text-slate-600"><Loader2 className="animate-spin" /></div>
                            ) : (
                                <BarChart data={daily} color="#3b82f6" height={120} />
                            )}
                        </div>

                        {/* Klinik breakdown */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                            <h3 className="text-white font-semibold mb-1">Kunjungan per Klinik</h3>
                            <p className="text-slate-500 text-xs mb-4">{period} hari terakhir</p>
                            {loading ? (
                                <div className="flex items-center justify-center h-32 text-slate-600"><Loader2 className="animate-spin" /></div>
                            ) : (
                                <HBarChart data={klinik} color="#8b5cf6" />
                            )}
                        </div>
                    </div>

                    {/* Klinik table */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-slate-800 flex items-center gap-2">
                            <p className="text-white font-medium text-sm">Rincian Kunjungan per Klinik</p>
                            <span className="text-xs text-slate-500">({period} hari terakhir)</span>
                        </div>
                        <table className="w-full text-sm">
                            <thead><tr className="border-b border-slate-800 text-slate-400">
                                <th className="text-left px-5 py-2.5 font-medium">Rank</th>
                                <th className="text-left px-5 py-2.5 font-medium">Klinik</th>
                                <th className="text-right px-5 py-2.5 font-medium">Total Kunjungan</th>
                                <th className="px-5 py-2.5" />
                            </tr></thead>
                            <tbody>
                                {klinik.length === 0 ? (
                                    <tr><td colSpan={4} className="text-center py-8 text-slate-600">Tidak ada data</td></tr>
                                ) : klinik.map((k, i) => {
                                    const max = klinik[0]?.count || 1
                                    return (
                                        <tr key={k.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                            <td className="px-5 py-3 text-slate-500 font-mono text-xs">{String(i + 1).padStart(2, '0')}</td>
                                            <td className="px-5 py-3 text-white font-medium">{k.klinik}</td>
                                            <td className="px-5 py-3 text-right">
                                                <span className="text-white font-bold">{k.count}</span>
                                            </td>
                                            <td className="px-5 py-3 w-32">
                                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-violet-600 rounded-full transition-all duration-500"
                                                        style={{ width: `${(k.count / max) * 100}%` }} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    )
}
