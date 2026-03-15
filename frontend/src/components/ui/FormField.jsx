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
                <label className="text-xs font-medium text-slate-600 tracking-wide">
                    {label}
                </label>
            )}
            <div className="relative w-full min-w-0">
                {Icon && (
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <Icon size={16} />
                    </div>
                )}
                <Component
                    disabled={disabled}
                    className={cn(
                        'w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none disabled:opacity-60 bg-white',
                        Icon && 'pl-11',
                        error && 'border-red-500 focus:ring-red-500 focus:border-transparent',
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
