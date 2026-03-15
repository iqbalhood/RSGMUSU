import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function StatCard({
    icon: Icon,
    label,
    value,
    trend,
    trendDirection = 'up',
    trendLabel,
    className,
    variant = 'neutral',
    ...props
}) {
    const isUp = trendDirection === 'up'
    const trendColor = isUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'

    const variants = {
        neutral: 'border-slate-200',
        primary: 'border-l-4 border-l-teal-600 border-slate-200',
        success: 'border-l-4 border-l-emerald-600 border-slate-200',
        warning: 'border-l-4 border-l-amber-600 border-slate-200',
    }

    return (
        <div
            className={cn(
                'bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col justify-between min-w-0 overflow-hidden',
                variants[variant],
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-between mb-4 min-w-0 gap-2">
                <span className="text-sm font-medium text-slate-600 truncate">{label}</span>
                {Icon && (
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200 flex-shrink-0">
                        <Icon size={18} className="text-slate-600" />
                    </div>
                )}
            </div>

            <div className="flex items-end justify-between gap-2 min-w-0">
                <p className="text-3xl font-bold text-slate-900 truncate">{value ?? '0'}</p>
                {trend && (
                    <div className={cn('flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium flex-shrink-0', trendColor)}>
                        {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        <span>{trend}</span>
                    </div>
                )}
            </div>
            {trendLabel && <p className="text-xs text-slate-400 mt-2">{trendLabel}</p>}
        </div>
    )
}
