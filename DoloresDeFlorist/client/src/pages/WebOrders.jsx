import { useStore } from '../store'
import StatusPill from '../components/StatusPill'

export default function WebOrders() {
  const { orders, accept, setStatus } = useStore()
  const list = orders.filter((o) => o.source === 'Web' && o.status === 'Awaiting approval')
  return (
    <>
      <h1>Web orders</h1>
      {list.length === 0 && <p>No web orders are waiting for approval.</p>}
      <div className="ilist">
        {list.map((o) => (
          <div className="panel" key={o.id}>
            <div className="row"><strong>{o.id}, {o.customer}</strong><StatusPill status={o.status} /></div>
            <p>{o.item} x{o.qty}, due {o.due}<br />{o.address}<br />Contact: {o.contact}</p>
            <div className="actions">
              <button className="btn" onClick={() => accept(o.id)}>Accept</button>
              <button className="pill" onClick={() => setStatus(o.id, 'Declined')}>Decline</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
