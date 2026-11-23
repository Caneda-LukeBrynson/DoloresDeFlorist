import { useStore } from '../store'
import PlatformBadge from './PlatformBadge'
import StatusPill from './StatusPill'

const FLOW = ['Preparing', 'Out for delivery', 'Delivered']

export default function OrderRow({ order: o, onEdit }) {
  const { setStatus } = useStore()
  const open = FLOW.includes(o.status)
  return (
    <tr>
      <td>{o.id}</td>
      <td>{o.customer}</td>
      <td>{o.item} x{o.qty}</td>
      <td>{o.due}</td>
      <td><PlatformBadge platform={o.source} /></td>
      <td><StatusPill status={o.status} /></td>
      <td>
        {open && (
          <select aria-label={`Update ${o.id}`} value={o.status} onChange={(e) => setStatus(o.id, e.target.value)}>
            {FLOW.map((s) => <option key={s}>{s}</option>)}
          </select>
        )}
        {open && <button className="pill" onClick={() => onEdit(o)}>Edit</button>}
        {open && <button className="pill" onClick={() => setStatus(o.id, 'Cancelled')}>Cancel</button>}
      </td>
    </tr>
  )
}