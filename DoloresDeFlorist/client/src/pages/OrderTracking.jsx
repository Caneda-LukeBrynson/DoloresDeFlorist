import { useState } from 'react'
import { useStore } from '../store'
import PublicBar from '../components/PublicBar'
import StatusPill from '../components/StatusPill'

const STEPS = ['Awaiting approval', 'Preparing', 'Out for delivery', 'Delivered', 'Completed']

export default function OrderTracking({ code }) {
  const { orders, received } = useStore()
  const [q, setQ] = useState(code || '')
  const o = orders.find((x) => x.id.toLowerCase() === (code || '').trim().toLowerCase())
  const at = o ? STEPS.indexOf(o.status) : -1
  return (
    <>
      <PublicBar />
      <main className="public">
        <h1>Track your order</h1>
        <div className="filters">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Order number, e.g. DDF-1001" aria-label="Order number" />
          <button className="btn" onClick={() => { location.hash = `#/track/${q.trim()}` }}>Find</button>
        </div>
        {code && !o && <p className="err">We could not find order {code}. Check the number and try again.</p>}
        {o && (
          <div className="panel">
            <div className="row"><strong>{o.id}</strong><StatusPill status={o.status} /></div>
            <p>{o.item} x{o.qty}, for {o.due}</p>
            {at >= 0 ? (
              <div className="steps">{STEPS.map((s, i) => <span key={s} className={i <= at ? 'done' : ''}>{s}</span>)}</div>
            ) : <p>This order was {o.status.toLowerCase()}. Please message the shop if you have questions.</p>}
            {o.status === 'Delivered' && (
              <><p>Did your flowers arrive?</p><button className="btn" onClick={() => received(o.id)}>Order received</button></>
            )}
            {o.status === 'Completed' && <p>Thank you for confirming. Enjoy your flowers!</p>}
          </div>
        )}
      </main>
    </>
  )
}
