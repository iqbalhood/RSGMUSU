import React from 'react'
import { cn } from '@/lib/utils'

export default function FormField({
    label,
    error,
    helperText,
    icon: Icon,
    className,
    as: Component = 'input',
    children,
    disabled = false,
    ...props
}) {
    return (
        <div className={cn('flex flex-col gap-1.5 w-full', className)}>
            {label && (
                <label className="text-xs font-semibold text-slate-600 tracking-wide">
                    {label}
                </label>
            )}
            <div className="relative w-full">
                {Icon && (
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <Icon size={16} />
                    </div>
                )}
                <Component
                    disabled={disabled}
                    className={cn(
                        'w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-600 disabled:opacity-60 disabled:bg-slate-50/50',
                        Icon && 'pl-11',
                        error && 'border-red-500 focus:ring-red-500/10 focus:border-red-600',
                        Component === 'select' && 'bg-white'
                    )}
                    {...props}
                >
                    {children}
                </Component>
            </div>
            {
                (error || helperText) && (
                    <p className={cn('text-xs min-h-[16px]', error ? 'text-red-500' : 'text-slate-400')}>
                        {error || helperText}
                    </p>
                )
            }
        </div >
    )
}
