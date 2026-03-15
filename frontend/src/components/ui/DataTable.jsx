import React from 'react'
import { Loader2, TableIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DataTable({
    columns = [],
    data = [],
    loading = false,
    emptyText = 'Tidak ada data ditemukan.',
    className,
    onRowClick,
    ...props
}) {
    return (
        <div className={cn('bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-w-0', className)} {...props}>
            <div className="overflow-x-auto min-w-0">
                <table className="w-full text-left text-sm border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            {columns.map((col, idx) => (
                                <th
                                    key={col.key || idx}
                                    className={cn('px-6 py-4 font-semibold text-slate-600 text-xs tracking-wider uppercase', col.className)}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, ridx) => (
                                <tr key={ridx} className="animate-pulse">
                                    {columns.map((_, cidx) => (
                                        <td key={cidx} className="px-6 py-4 min-w-0">
                                            <div className="h-4 bg-slate-100 rounded-md w-3/4" />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400">
                                    <div className="flex flex-col items-center gap-2 min-w-0">
                                        <TableIcon size={32} className="text-slate-300" />
                                        <p>{emptyText}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((row, ridx) => (
                                <tr
                                    key={row.id || ridx}
                                    onClick={() => onRowClick && onRowClick(row)}
                                    className={cn(
                                        'hover:bg-slate-50 transition-colors',
                                        onRowClick && 'cursor-pointer'
                                    )}
                                >
                                    {columns.map((col, cidx) => (
                                        <td
                                            key={col.key || cidx}
                                            className={cn('px-6 py-3 text-slate-600 font-normal min-w-0', col.cellClassName)}
                                        >
                                            {col.cell ? col.cell(row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
