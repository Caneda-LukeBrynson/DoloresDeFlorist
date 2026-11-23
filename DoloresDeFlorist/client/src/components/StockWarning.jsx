import { useStore, ARRANGEMENTS, MAX_PER_DAY, dayCount } from '../store'

export default function StockWarning({ item, qty, due }) {
  const { stock, orders } = useStore()
  const a = ARRANGEMENTS.find((x) => x.name === item)
  const warns = []
  if (a) for (const [id, n] of Object.entries(a.uses)) {
    const s = stock.find((x) => x.id === id)
    if (s && s.qty < n * qty) warns.push(`Low on ${s.name}: ${s.qty} left, ${n * qty} needed.`)
  }
  if (due && dayCount(orders, due) >= MAX_PER_DAY) warns.push(`${due} already has ${MAX_PER_DAY} orders. Pick another day.`)
  return warns.length ? <div className="warn" role="alert">{warns.map((w) => <p key={w}>{w}</p>)}</div> : null
}
