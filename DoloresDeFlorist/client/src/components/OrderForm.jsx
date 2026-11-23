import { useState } from 'react'
import { useStore, ARRANGEMENTS } from '../store'
import OrderField from './OrderField'
import StockWarning from './StockWarning'
import CreateOrderBtn from './CreateOrderBtn'

export default function OrderForm({ inq, order, onDone }) {
  const { createOrder, updateOrder } = useStore()
  const [f, setF] = useState(order
    ? { customer: order.customer, item: order.item, qty: order.qty, due: order.due, address: order.address, price: order.price }
    : { customer: inq.name, item: ARRANGEMENTS[0].name, qty: 1, due: '', address: '', price: '' })
  const [err, setErr] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const auto = (ARRANGEMENTS.find((a) => a.name === f.item)?.price || 0) * f.qty
  const price = f.price === '' ? auto : +f.price
  const submit = () => {
    const x = { ...f, qty: +f.qty, price }
    const r = order ? updateOrder(order.id, x) : createOrder({ ...x, source: inq.platform }, inq.id)
    r.error ? setErr(r.error) : onDone(r.order)
  }
  return (
    <div className="panel">
      {!order && <h3>Create order from {inq.platform} inquiry</h3>}
      <OrderField label="Customer"><input value={f.customer} onChange={set('customer')} /></OrderField>
      <OrderField label="Arrangement">
        <select value={f.item} onChange={set('item')}>{ARRANGEMENTS.map((a) => <option key={a.name}>{a.name}</option>)}</select>
      </OrderField>
      <OrderField label="Quantity"><input type="number" min="1" value={f.qty} onChange={set('qty')} /></OrderField>
      <OrderField label="Price (₱)"><input type="number" min="0" value={f.price === '' ? auto : f.price} onChange={set('price')} /></OrderField>
      <OrderField label="Due date"><input type="date" value={f.due} onChange={set('due')} /></OrderField>
      <OrderField label="Delivery address"><input value={f.address} onChange={set('address')} /></OrderField>
      <StockWarning item={f.item} qty={+f.qty} due={order && f.due === order.due ? '' : f.due} />
      {err && <p className="err" role="alert">{err}</p>}
      <CreateOrderBtn onClick={submit} label={order ? 'Save changes' : 'Create order'} />
    </div>
  )
}