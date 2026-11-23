import { useState } from 'react'
import { useStore } from '../store'
import OrderField from '../components/OrderField'

export default function Stock() {
  const { stock, setQty, addStock } = useStore()
  const [n, setN] = useState({ name: '', qty: '', min: '' })
  const add = () => { if (n.name && n.qty !== '') { addStock(n.name, +n.qty, +n.min || 0); setN({ name: '', qty: '', min: '' }) } }
  const set = (k) => (e) => setN({ ...n, [k]: e.target.value })
  return (
    <>
      <h1>Flower stock</h1>
      <div className="tw">
        <table>
          <thead><tr><th>Item</th><th>On hand</th><th>Low at</th><th>Status</th></tr></thead>
          <tbody>
            {stock.map((s) => (
              <tr key={s.id} className={s.qty <= s.min ? 'low' : ''}>
                <td>{s.name}</td>
                <td><input type="number" min="0" value={s.qty} onChange={(e) => setQty(s.id, +e.target.value)} aria-label={`${s.name} quantity`} /></td>
                <td>{s.min}</td>
                <td>{s.qty <= s.min ? 'Low stock' : 'OK'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel" style={{ marginTop: 20, maxWidth: 420 }}>
        <h3>Add item</h3>
        <OrderField label="Name"><input value={n.name} onChange={set('name')} /></OrderField>
        <OrderField label="Quantity"><input type="number" min="0" value={n.qty} onChange={set('qty')} /></OrderField>
        <OrderField label="Warn me at or below"><input type="number" min="0" value={n.min} onChange={set('min')} /></OrderField>
        <button className="btn" onClick={add}>Add item</button>
      </div>
    </>
  )
}
