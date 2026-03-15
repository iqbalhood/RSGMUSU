import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Modal({
    children,
    isOpen,
    onClose,
    title,
    description,
    footer,
    className,
    contentClassName,
    ...props
}) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    if (!isOpen) return null

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
            <div
                className={cn(
                    'w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden transform scale-95 animate-scaleUp',
                    className
                )}
                {...props}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 flex-shrink-0">
                    <div>
                        {title && <h3 className="text-lg font-bold font-display text-slate-900 leading-none">{title}</h3>}
                        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-xl hover:bg-slate-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className={cn('p-6 overflow-y-auto flex-1 text-slate-700 text-sm', contentClassName)}>
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 flex-shrink-0">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    )
}
