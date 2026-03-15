import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stethoscope, Eye, EyeOff, Lock, User } from 'lucide-react'
import api from '@/lib/api'
import { setToken, setUser, getRoleRoute } from '@/lib/auth'
import FormField from '@/components/ui/FormField'
import Button from '@/components/ui/Button'

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ username: '', password: '' })
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const { data } = await api.post('/auth/login', form)
            if (data.status === 'correct' || data.token) {
                setToken(data.token)
                setUser({ username: form.username, akses: data.akses })
                navigate(getRoleRoute(data.akses))
            } else {
                setError(data.message || 'Username atau password salah')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Terjadi kesalahan. Coba lagi.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Left Column: Atmospheric Visuals */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(13,148,136,0.1),transparent)]" />
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"></div>

                <div className="relative text-center max-w-md animate-fadeIn">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-600 rounded-3xl mb-6 shadow-2xl shadow-teal-600/30">
                        <Stethoscope size={40} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
                        RSGM Universitas Sumatera Utara
                    </h1>
                    <p className="text-slate-400 text-base leading-relaxed">
                        Rumah Sakit Gigi dan Mulut terintegrasi yang melayani dengan standar akademik dan profesionalisme terbaik demi senyuman sehat Indonesia.
                    </p>
                </div>
                <p className="absolute bottom-8 left-12 text-xs text-slate-500 font-medium">
                    © 2025 RSGM USU. All rights reserved.
                </p>
            </div>

            {/* Right Column: Form Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 animate-fadeIn">
                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center lg:text-left">
                        <div className="lg:hidden inline-flex items-center justify-center w-14 h-14 bg-teal-600 rounded-2xl mb-4 shadow-xl shadow-teal-600/20">
                            <Stethoscope size={28} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 leading-none">Selamat Datang</h2>
                        <p className="text-slate-400 text-sm mt-2">Masuk ke Sistem Informasi RSGM USU</p>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-medium flex gap-2 items-center">
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormField
                            label="Username"
                            icon={User}
                            type="text"
                            autoFocus
                            value={form.username}
                            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                            placeholder="Masukkan username"
                            required
                        />

                        <div className="relative">
                            <FormField
                                label="Password"
                                icon={Lock}
                                type={showPw ? 'text' : 'password'}
                                value={form.password}
                                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                                placeholder="Masukkan password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw(!showPw)}
                                className="absolute right-3.5 top-[34px] text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            className="w-full py-3 mt-2 font-semibold tracking-wide"
                        >
                            Masuk
                        </Button>
                    </form>

                    <p className="text-center lg:hidden mt-8 text-slate-400 text-xs">
                        © 2025 RSGM USU.
                    </p>
                </div>
            </div>
        </div>
    )
}
