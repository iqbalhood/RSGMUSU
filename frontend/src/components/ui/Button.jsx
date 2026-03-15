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
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]'

    const variants = {
        primary: 'bg-teal-600 hover:bg-teal-500 text-white focus:ring-teal-500 shadow-sm hover:shadow',
        secondary: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-400 shadow-sm',
        ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 focus:ring-slate-400',
        danger: 'bg-red-600 hover:bg-red-500 text-white focus:ring-red-500 shadow-sm',
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
