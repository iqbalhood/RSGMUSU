import React from 'react'
import { Link } from 'react-router-dom'
import { Home, AlertTriangle } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-[hsl(224_71.4%_6%)] to-slate-900 p-6 text-center">
            <AlertTriangle size={48} className="text-amber-400 mb-4" />
            <h1 className="text-6xl font-extrabold text-white mb-2">404</h1>
            <p className="text-slate-400 text-lg mb-8">Halaman tidak ditemukan</p>
            <Link
                to="/"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all"
            >
                <Home size={18} />
                Kembali ke Beranda
            </Link>
        </div>
    )
}
