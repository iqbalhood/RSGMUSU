import React from 'react'
import { cn } from '@/lib/utils'

export default function PageHeader({
    title,
    subtitle,
    actions,
    className,
    ...props
}) {
    return (
        <div className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-8 px-6 bg-white border-b border-slate-100 shadow-sm animate-fadeIn', className)} {...props}>
            <div>
                {title && <h2 className="text-2xl font-bold font-display text-slate-900 tracking-tight leading-none">{title}</h2>}
                {subtitle && <p className="text-sm text-slate-400 mt-1 max-w-lg">{subtitle}</p>}
            </div>
            {actions && (
                <div className="flex items-center gap-3 flex-wrap">
                    {actions}
                </div>
            )}
        </div>
    )
}
