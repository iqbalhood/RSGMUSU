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
        <div className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 py-6 px-6 bg-white border-b border-slate-200 shadow-sm min-w-0', className)} {...props}>
            <div className="min-w-0">
                {title && <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-none">{title}</h2>}
                {subtitle && <p className="text-sm text-slate-600 mt-1 max-w-lg">{subtitle}</p>}
            </div>
            {actions && (
                <div className="flex items-center gap-3 flex-wrap min-w-0">
                    {actions}
                </div>
            )}
        </div>
    )
}
