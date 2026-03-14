import React, { useState } from 'react'

/**
 * Odontogram Interaktif — FDI World Dental Federation numbering
 * Upper jaw: 11-18 (right→left), 21-28 (left)
 * Lower jaw: 41-48 (right), 31-38 (left→right)
 */

const CONDITIONS = [
    { code: 'N', label: 'Normal', color: '#1e293b', text: '#94a3b8' },
    { code: 'K', label: 'Karies', color: '#dc2626', text: '#fff' },
    { code: 'M', label: 'Missing', color: '#475569', text: '#fff' },
    { code: 'CR', label: 'Crown', color: '#7c3aed', text: '#fff' },
    { code: 'GI', label: 'GI/Resto', color: '#2563eb', text: '#fff' },
    { code: 'RCT', label: 'RCT', color: '#d97706', text: '#fff' },
    { code: 'X', label: 'Fraktur', color: '#be123c', text: '#fff' },
    { code: 'I', label: 'Implan', color: '#059669', text: '#fff' },
]

const UPPER_RIGHT = [18, 17, 16, 15, 14, 13, 12, 11]
const UPPER_LEFT = [21, 22, 23, 24, 25, 26, 27, 28]
const LOWER_LEFT = [31, 32, 33, 34, 35, 36, 37, 38]
const LOWER_RIGHT = [48, 47, 46, 45, 44, 43, 42, 41]

function Tooth({ number, condition = 'N', onSelect, size = 36 }) {
    const cond = CONDITIONS.find(c => c.code === condition) || CONDITIONS[0]
    const isMolar = [6, 7, 8].includes(number % 10)
    const r = size / 2 - 3
    const cx = size / 2
    const cy = size / 2

    return (
        <g onClick={() => onSelect(number)} style={{ cursor: 'pointer' }}>
            {/* Tooth shape */}
            {isMolar ? (
                <rect x={cx - r + 1} y={cy - r + 1} width={(r - 1) * 2} height={(r - 1) * 2}
                    rx="4" fill={cond.color} stroke="#334155" strokeWidth="1.5"
                    className="transition-all duration-200 hover:opacity-80" />
            ) : (
                <ellipse cx={cx} cy={cy} rx={r - 1} ry={r - 1}
                    fill={cond.color} stroke="#334155" strokeWidth="1.5"
                    className="transition-all duration-200 hover:opacity-80" />
            )}
            {/* Condition code */}
            <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
                fill={cond.text} fontSize={condition.length > 1 ? '7' : '9'} fontWeight="700" fontFamily="monospace">
                {condition === 'N' ? number : condition}
            </text>
            {/* Tooth number below */}
            <text x={cx} y={size - 1} textAnchor="middle" dominantBaseline="auto"
                fill="#64748b" fontSize="7" fontFamily="sans-serif">
                {condition === 'N' ? '' : number}
            </text>
        </g>
    )
}

function ToothRow({ numbers, teeth, onSelect, label, align = 'row' }) {
    const SIZE = 38
    const GAP = 2
    const totalW = numbers.length * (SIZE + GAP)
    return (
        <svg width={totalW} height={SIZE + 16} style={{ overflow: 'visible' }}>
            {numbers.map((n, i) => (
                <g key={n} transform={`translate(${i * (SIZE + GAP)}, 8)`}>
                    <Tooth number={n} condition={teeth[n] || 'N'} onSelect={onSelect} size={SIZE} />
                </g>
            ))}
        </svg>
    )
}

export default function Odontogram({ value = {}, onChange, readonly = false }) {
    const [selected, setSelected] = useState(null)
    const [activeCondition, setActiveCondition] = useState('K')

    function handleToothClick(number) {
        if (readonly) return
        if (selected === number) {
            setSelected(null)
            return
        }
        // Apply active condition toggle
        const current = value[number] || 'N'
        const next = current === activeCondition ? 'N' : activeCondition
        onChange?.({ ...value, [number]: next })
        setSelected(number)
    }

    return (
        <div className="space-y-4">
            {/* Condition picker */}
            {!readonly && (
                <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-slate-500 self-center mr-1">Kondisi:</span>
                    {CONDITIONS.filter(c => c.code !== 'N').map(c => (
                        <button
                            key={c.code}
                            onClick={() => setActiveCondition(c.code)}
                            title={c.label}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border-2 ${activeCondition === c.code ? 'scale-110 border-white' : 'border-transparent opacity-70 hover:opacity-100'}`}
                            style={{ backgroundColor: c.color, color: c.text }}
                        >
                            {c.code}
                        </button>
                    ))}
                    <span className="text-xs text-slate-500 self-center ml-2">
                        Klik gigi → tandai sebagai <strong className="text-white">{CONDITIONS.find(c => c.code === activeCondition)?.label}</strong> (klik lagi → hapus)
                    </span>
                </div>
            )}

            {/* Dental chart */}
            <div className="overflow-x-auto">
                <div className="inline-block bg-slate-950 border border-slate-800 rounded-2xl p-5 min-w-max">
                    {/* Upper jaw */}
                    <div className="flex items-center gap-0">
                        <div className="text-xs text-slate-600 w-16 text-right pr-2 flex-shrink-0">RA kanan</div>
                        <ToothRow numbers={UPPER_RIGHT} teeth={value} onSelect={handleToothClick} />
                        <div className="w-px h-8 bg-slate-700 mx-2 flex-shrink-0" />
                        <ToothRow numbers={UPPER_LEFT} teeth={value} onSelect={handleToothClick} />
                        <div className="text-xs text-slate-600 w-16 pl-2 flex-shrink-0">kiri</div>
                    </div>

                    {/* Center line */}
                    <div className="flex items-center my-1">
                        <div className="w-16 flex-shrink-0" />
                        <div className="flex-1 h-px bg-slate-700" />
                        <div className="text-xs text-slate-600 px-3 flex-shrink-0">— Midline —</div>
                        <div className="flex-1 h-px bg-slate-700" />
                        <div className="w-16 flex-shrink-0" />
                    </div>

                    {/* Lower jaw */}
                    <div className="flex items-center gap-0">
                        <div className="text-xs text-slate-600 w-16 text-right pr-2 flex-shrink-0">RB kanan</div>
                        <ToothRow numbers={LOWER_RIGHT} teeth={value} onSelect={handleToothClick} />
                        <div className="w-px h-8 bg-slate-700 mx-2 flex-shrink-0" />
                        <ToothRow numbers={LOWER_LEFT} teeth={value} onSelect={handleToothClick} />
                        <div className="text-xs text-slate-600 w-16 pl-2 flex-shrink-0">kiri</div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-2 mt-1">
                {CONDITIONS.map(c => (
                    <div key={c.code} className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: c.color, border: '1px solid #475569' }} />
                        <span className="text-xs text-slate-500">{c.label}</span>
                    </div>
                ))}
            </div>

            {/* Active marks summary */}
            {Object.keys(value).filter(k => value[k] && value[k] !== 'N').length > 0 && (
                <div className="bg-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400">
                    <span className="text-slate-300 font-medium">Catatan: </span>
                    {Object.entries(value)
                        .filter(([, v]) => v && v !== 'N')
                        .sort(([a], [b]) => parseInt(a) - parseInt(b))
                        .map(([tooth, cond]) => (
                            <span key={tooth} className="mr-2">
                                <span className="text-white font-mono">{tooth}</span>
                                <span className="text-slate-500">:{cond}</span>
                            </span>
                        ))
                    }
                </div>
            )}
        </div>
    )
}
