import { createContext, useContext, useState } from 'react'

const accounts0 = [
  { email: 'owner@dolores.test', password: 'owner123', name: 'Dolores', role: 'owner' },
  { email: 'customer@demo.test', password: 'customer123', name: 'Liza Go', role: 'customer' },
]
export const homeFor = (u) => (u?.role === 'owner' ? '/owner/inquiries' : '/customer/orders')

const Ctx = createContext()
export const useAuth = () => useContext(Ctx)

export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useState(accounts0)
  const [user, setUser] = useState(() => { try { return JSON.parse(sessionStorage.getItem('ddf-user')) } catch { return null } })
  const save = (u) => {
    setUser(u)
    try { u ? sessionStorage.setItem('ddf-user', JSON.stringify(u)) : sessionStorage.removeItem('ddf-user') } catch { /* ignore */ }
  }
  const strip = ({ password, ...u }) => u
  const login = (email, password) => {
    const a = accounts.find((x) => x.email === email.trim().toLowerCase() && x.password === password)
    if (!a) return { error: 'Wrong email or password.' }
    save(strip(a)); return { user: strip(a) }
  }
  const register = (name, email, password) => {
    const e = email.trim().toLowerCase()
    if (!name.trim() || !e || password.length < 6) return { error: 'Enter your name, email, and a password of at least 6 characters.' }
    if (accounts.some((x) => x.email === e)) return { error: 'That email already has an account.' }
    const a = { email: e, password, name: name.trim(), role: 'customer' }
    setAccounts((l) => [...l, a]); save(strip(a)); return { user: strip(a) }
  }
  return <Ctx.Provider value={{ user, login, register, logout: () => save(null) }}>{children}</Ctx.Provider>
}