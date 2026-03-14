const AUTH_KEY = 'rsgm_token'
const USER_KEY = 'rsgm_user'

export function getToken() {
    return localStorage.getItem(AUTH_KEY)
}

export function setToken(token) {
    localStorage.setItem(AUTH_KEY, token)
}

export function getUser() {
    try {
        return JSON.parse(localStorage.getItem(USER_KEY))
    } catch {
        return null
    }
}

export function setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuth() {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(USER_KEY)
}

export function isAuthenticated() {
    return !!getToken()
}

export function getAkses() {
    const user = getUser()
    return user?.akses ?? null
}

// akses: '1' = Admin, '2' = Dokter/Klinik, '3' = Frontdesk/Kasir/Apotek
export function getRoleRoute(akses) {
    switch (String(akses)) {
        case '1': return '/admin'
        case '2': return '/klinik'
        case '3': return '/frontdesk'
        default: return '/login'
    }
}
