import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Button({
    children,
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon: Icon,
    iconClassName,
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 focus:ring-teal-500',
        secondary: 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 focus:ring-slate-400',
        ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 focus:ring-slate-400',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 px-4 py-2',
    }

    const sizes = {
        sm: 'px-3 py-1.5 text-xs gap-1.5',
        md: 'px-4 py-2 text-sm gap-2',
        lg: 'px-5 py-2.5 text-base gap-2',
    }

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <Loader2 size={16} className="animate-spin" />
            ) : Icon ? (
                <Icon size={size === 'sm' ? 14 : 18} className={iconClassName} />
            ) : null}
            <span>{children}</span>
        </button>
    )
}
