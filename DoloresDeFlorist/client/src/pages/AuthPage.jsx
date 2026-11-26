import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth, homeFor } from '../auth'
import PublicBar from '../components/PublicBar'
import OrderField from '../components/OrderField'

export default function AuthPage({ mode }) {
  const { user, login, register } = useAuth()
  const loc = useLocation()
  const reg = mode === 'register'
  const [f, setF] = useState({ name: '', email: '', password: '' })
  const [err, setErr] = useState('')
  if (user) {
    const from = loc.state?.from
    return <Navigate to={from && from.startsWith('/' + user.role) ? from : homeFor(user)} replace />
  }
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = () => {
    const r = reg ? register(f.name, f.email, f.password) : login(f.email, f.password)
    if (r.error) setErr(r.error)
  }
  return (
    <>
      <PublicBar />
      <main className="public">
        <div className="panel">
          <h1>{reg ? 'Create account' : 'Log in'}</h1>
          {reg && <OrderField label="Your name"><input value={f.name} onChange={set('name')} /></OrderField>}
          <OrderField label="Email"><input type="email" value={f.email} onChange={set('email')} /></OrderField>
          <OrderField label="Password">
            <input type="password" value={f.password} onChange={set('password')} onKeyDown={(e) => e.key === 'Enter' && submit()} />
          </OrderField>
          {err && <p className="err" role="alert">{err}</p>}
          <button className="btn" onClick={submit}>{reg ? 'Create account' : 'Log in'}</button>
          <p>{reg ? <>Already have an account? <Link to="/login">Log in</Link></> : <>New here? <Link to="/register">Create a customer account</Link></>}</p>
          {!reg && <small>Demo accounts: owner@dolores.test / owner123 and customer@demo.test / customer123. Replace with real login when the backend is ready.</small>}
        </div>
      </main>
    </>
  )
}