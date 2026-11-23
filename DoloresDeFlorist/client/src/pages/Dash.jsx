import { useStore, MAX_PER_DAY, dayCount } from '../store'
import InquiryDash from './InquiryDash'
import OrderDash from './OrderDash'
import WebOrders from './WebOrders'
import Calendar from './Calendar'
import Stock from './Stock'
import Notifications from './Notifications'

const tabs = [['inquiries', 'Inquiries'], ['orders', 'Orders'], ['web', 'Web orders'], ['calendar', 'Calendar'], ['stock', 'Flower stock'], ['alerts', 'Notifications']]
const views = { inquiries: InquiryDash, orders: OrderDash, web: WebOrders, calendar: Calendar, stock: Stock, alerts: Notifications }

export default function Dash({ tab }) {
  const { orders, stock, notifs } = useStore()
  const cur = views[tab] ? tab : 'inquiries'
  const View = views[cur]
  const badge = {
    web: orders.filter((o) => o.source === 'Web' && o.status === 'Awaiting approval').length,
    alerts: notifs.length + stock.filter((s) => s.qty <= s.min).length + [...new Set(orders.map((o) => o.due))].filter((d) => dayCount(orders, d) >= MAX_PER_DAY).length,
  }
  return (
    <div className="dash">
      <nav className="side" aria-label="Owner">
        <img src="/logo.jpg" alt="Dolores de Florist" />
        {tabs.map(([k, label]) => (
          <a key={k} href={`#/owner/${k}`} className={cur === k ? 'on' : ''}>{label}{badge[k] > 0 && <span className="n">{badge[k]}</span>}</a>
        ))}
        <a href="#/">View shop</a>
      </nav>
      <main className="main"><View /></main>
    </div>
  )
}
