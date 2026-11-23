import { useState } from 'react'
import { useStore } from '../store'
import OrderFilters from '../components/OrderFilters'
import OrderTable from '../components/OrderTable'
import OrderForm from '../components/OrderForm'

export default function OrderDash() {
  const { orders } = useStore()
  const [f, setF] = useState({ q: '', status: 'All' })
  const [edit, setEdit] = useState(null)
  if (edit) return (
    <>
      <h1>Edit order {edit.id}</h1>
      <div style={{ maxWidth: 520 }}>
        <OrderForm order={edit} onDone={() => setEdit(null)} />
        <p><button className="pill" onClick={() => setEdit(null)}>Back to orders</button></p>
      </div>
    </>
  )
  const today = new Date().toLocaleDateString('en-CA')
  const todo = orders.filter((o) => ['Awaiting approval', 'Preparing', 'Out for delivery'].includes(o.status))
  const rows = orders.filter((o) => (f.status === 'All' || o.status === f.status) && (o.customer + o.id).toLowerCase().includes(f.q.toLowerCase()))
  return (
    <>
      <h1>Orders</h1>
      <div className="stats">
        <div className="panel"><strong>{todo.filter((o) => o.due === today).length}</strong>due today</div>
        <div className="panel"><strong>{todo.filter((o) => o.status === 'Awaiting approval').length}</strong>awaiting approval</div>
        <div className="panel"><strong>{todo.filter((o) => o.status === 'Out for delivery').length}</strong>out for delivery</div>
      </div>
      <OrderFilters value={f} onChange={setF} />
      <OrderTable rows={rows} onEdit={setEdit} />
    </>
  )
}