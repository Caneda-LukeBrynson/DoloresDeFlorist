import { STATUSES } from '../store'

export default function OrderFilters({ value, onChange }) {
  return (
    <div className="filters">
      <input placeholder="Search customer or order no." aria-label="Search orders" value={value.q} onChange={(e) => onChange({ ...value, q: e.target.value })} />
      <select aria-label="Filter by status" value={value.status} onChange={(e) => onChange({ ...value, status: e.target.value })}>
        {['All', ...STATUSES].map((s) => <option key={s}>{s}</option>)}
      </select>
    </div>
  )
}
