import { useStore, MAX_PER_DAY, dayCount } from '../store'
import DashShell from '../components/DashShell'

const tabs = [['inquiries', 'Inquiries'], ['orders', 'Orders'], ['web', 'Web orders'], ['calendar', 'Calendar'], ['stock', 'Flower stock'], ['alerts', 'Notifications']]

export default function Dash() {
  const { orders, stock, notifs } = useStore()
  const fullDays = [...new Set(orders.map((o) => o.due))].filter((d) => dayCount(orders, d) >= MAX_PER_DAY).length
  const badge = {
    web: orders.filter((o) => o.source === 'Web' && o.status === 'Awaiting approval').length,
    alerts: notifs.length + stock.filter((s) => s.qty <= s.min).length + fullDays,
  }
  return <DashShell tabs={tabs} badge={badge} />
}