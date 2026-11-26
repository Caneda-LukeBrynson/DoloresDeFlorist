import { useStore } from '../store'
import StatusPill from './StatusPill'

const STEPS = ['Awaiting approval', 'Preparing', 'Out for delivery', 'Delivered', 'Completed']

export default function OrderStatusCard({ order: o }) {
  const { received } = useStore()
  const at = STEPS.indexOf(o.status)
  return (
    <div className="panel">
      <div className="row"><strong>{o.id}</strong><StatusPill status={o.status} /></div>
      <p>{o.item} x{o.qty}, for {o.due}</p>
      {at >= 0
        ? <div className="steps">{STEPS.map((s, i) => <span key={s} className={i <= at ? 'done' : ''}>{s}</span>)}</div>
        : <p>This order was {o.status.toLowerCase()}. Please message the shop if you have questions.</p>}
      {o.status === 'Delivered' && (
        <><p>Did your flowers arrive?</p><button className="btn" onClick={() => received(o.id)}>Order received</button></>
      )}
      {o.status === 'Completed' && <p>Thank you for confirming. Enjoy your flowers!</p>}
    </div>
  )
}