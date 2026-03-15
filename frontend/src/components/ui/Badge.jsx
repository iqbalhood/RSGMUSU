import React from 'react'
import { cn } from '@/lib/utils'

export default function Badge({
    children,
    className,
    variant = 'neutral',
    size = 'md',
    ...props
}) {
    const baseStyles = 'inline-flex items-center font-medium rounded-full text-center'

    const variants = {
        neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
        success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        warning: 'bg-amber-50 text-amber-700 border border-amber-200',
        danger: 'bg-red-50 text-red-700 border border-red-200',
        info: 'bg-sky-50 text-sky-700 border border-sky-200',
    }

    const sizes = {
        sm: 'px-2 py-0.5 text-[11px]',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
    }

    return (
        <span
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </span>
    )
}
