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
        neutral: 'bg-white text-slate-900 border border-slate-200',
        primary: 'bg-white text-slate-900 border-l-4 border-l-teal-600 border-slate-200',
        success: 'bg-white text-slate-900 border-l-4 border-l-emerald-600 border-slate-200',
        warning: 'bg-white text-slate-900 border-l-4 border-l-amber-600 border-slate-200',
    }

    return (
        <div
            className={cn(
                'rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden min-w-0',
                variants[variant],
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">{label}</span>
                {Icon && (
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                        <Icon size={18} className="text-slate-600" />
                    </div>
                )}
            </div>

            <div className="flex items-end justify-between">
                <p className="text-3xl font-bold font-display text-slate-900">{value ?? '0'}</p>
                {trend && (
                    <div className={cn('flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium', trendColor)}>
                        {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        <span>{trend}</span>
                    </div>
                )}
            </div>
            {trendLabel && <p className="text-xs text-slate-400 mt-2">{trendLabel}</p>}
        </div>
    )
}
