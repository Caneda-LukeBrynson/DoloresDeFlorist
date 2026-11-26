import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore, ARRANGEMENTS } from '../store'
import { useAuth } from '../auth'
import OrderField from '../components/OrderField'

export default function WebOrderForm() {
  const { submitWeb } = useStore()
  const { user } = useAuth()
  const [f, setF] = useState({ customer: user.name, contact: '', item: ARRANGEMENTS[0].name, qty: 1, due: '', address: '' })
  const [err, setErr] = useState('')
  const [done, setDone] = useState(null)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const price = (ARRANGEMENTS.find((a) => a.name === f.item)?.price || 0) * f.qty
  const submit = () => {
    const r = submitWeb({ ...f, qty: +f.qty, price, email: user.email })
    r.error ? setErr(r.error) : setDone(r.order)
  }
  if (done) return (
    <div className="panel" style={{ maxWidth: 520 }}>
      <h1>Order sent</h1>
      <p>Thank you, {done.customer}. Dolores de Florist will confirm your order shortly. Your order number is <strong>{done.id}</strong>.</p>
      <Link className="btn" to="/customer/orders">View my orders</Link>
    </div>
  )
  return (
    <>
      <h1>New order</h1>
      <div className="panel" style={{ maxWidth: 520 }}>
        <OrderField label="Your name"><input value={f.customer} onChange={set('customer')} /></OrderField>
        <OrderField label="Phone or Messenger name"><input value={f.contact} onChange={set('contact')} /></OrderField>
        <OrderField label="Arrangement">
          <select value={f.item} onChange={set('item')}>{ARRANGEMENTS.map((a) => <option key={a.name}>{a.name}</option>)}</select>
        </OrderField>
        <OrderField label="Quantity"><input type="number" min="1" value={f.qty} onChange={set('qty')} /></OrderField>
        <OrderField label="Delivery date"><input type="date" value={f.due} onChange={set('due')} /></OrderField>
        <OrderField label="Delivery address"><input value={f.address} onChange={set('address')} /></OrderField>
        <strong>Total: ₱{price.toLocaleString()}</strong>
        {err && <p className="err" role="alert">{err}</p>}
        <button className="btn" onClick={submit}>Place order</button>
      </div>
    </>
  )
}