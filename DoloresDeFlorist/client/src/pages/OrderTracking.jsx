import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../store'
import PublicBar from '../components/PublicBar'
import OrderStatusCard from '../components/OrderStatusCard'

export default function OrderTracking() {
  const { code } = useParams()
  const nav = useNavigate()
  const { orders } = useStore()
  const [q, setQ] = useState(code || '')
  const o = orders.find((x) => x.id.toLowerCase() === (code || '').trim().toLowerCase())
  return (
    <>
      <PublicBar />
      <main className="public">
        <h1>Track your order</h1>
        <div className="filters">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Order number, e.g. DDF-1001" aria-label="Order number" />
          <button className="btn" onClick={() => nav(`/track/${q.trim()}`)}>Find</button>
        </div>
        {code && !o && <p className="err">We could not find order {code}. Check the number and try again.</p>}
        {o && <OrderStatusCard order={o} />}
      </main>
    </>
  )
}