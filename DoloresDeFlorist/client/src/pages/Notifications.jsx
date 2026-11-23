import { useStore, MAX_PER_DAY, dayCount } from '../store'

export default function Notifications() {
  const { stock, orders, notifs } = useStore()
  const days = [...new Set(orders.map((o) => o.due))].filter((d) => dayCount(orders, d) >= MAX_PER_DAY)
  const items = [
    ...notifs.map((x) => x.text),
    ...stock.filter((s) => s.qty <= s.min).map((s) => `Low stock: ${s.name}, ${s.qty} left`),
    ...days.map((d) => `${d} is full with ${MAX_PER_DAY} orders`),
  ]
  return (
    <>
      <h1>Notifications</h1>
      {items.length === 0 && <p>Nothing needs your attention.</p>}
      <div className="ilist">{items.map((t) => <div className="panel" key={t}>{t}</div>)}</div>
    </>
  )
}
