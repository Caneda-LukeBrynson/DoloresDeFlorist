import { useState } from 'react'
import { useStore, MAX_PER_DAY, dayCount } from '../store'
import StatusPill from '../components/StatusPill'

export default function Calendar() {
  const { orders } = useStore()
  const [sel, setSel] = useState(null)
  const now = new Date(), y = now.getFullYear(), m = now.getMonth()
  const lead = new Date(y, m, 1).getDay()
  const total = new Date(y, m + 1, 0).getDate()
  const key = (d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  const cells = [...Array(lead).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)]
  const list = sel ? orders.filter((o) => o.due === key(sel) && !['Cancelled', 'Declined'].includes(o.status)) : []
  return (
    <>
      <h1>{now.toLocaleString('en', { month: 'long', year: 'numeric' })}</h1>
      <p>Days with {MAX_PER_DAY} or more orders are shaded red. Select a day to see its orders.</p>
      <div className="cal">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <b key={d}>{d}</b>)}
        {cells.map((d, i) => {
          if (!d) return <i key={i} />
          const n = dayCount(orders, key(d))
          return (
            <button key={i} className={`day ${n >= MAX_PER_DAY ? 'full' : ''} ${sel === d ? 'on' : ''}`} onClick={() => setSel(d)}>
              <strong>{d}</strong>{n > 0 && <small>{n} order{n > 1 ? 's' : ''}</small>}
            </button>
          )
        })}
      </div>
      {sel && (
        <div className="panel" style={{ marginTop: 20 }}>
          <h3>Due on {key(sel)}</h3>
          {list.length === 0 && <p>No orders due.</p>}
          {list.map((o) => (
            <div className="row" key={o.id}><span>{o.id}, {o.customer}: {o.item} x{o.qty}, {o.address}</span><StatusPill status={o.status} /></div>
          ))}
        </div>
      )}
    </>
  )
}