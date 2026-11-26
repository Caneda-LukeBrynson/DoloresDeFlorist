import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { useAuth } from '../auth'
import OrderStatusCard from '../components/OrderStatusCard'

export default function MyOrders() {
  const { orders } = useStore()
  const { user } = useAuth()
  const mine = orders.filter((o) => o.email === user.email)
  return (
    <>
      <h1>My orders</h1>
      {mine.length === 0 && <p>You have no orders yet. <Link to="/customer/new">Place your first order</Link>.</p>}
      <div className="ilist">{mine.map((o) => <OrderStatusCard key={o.id} order={o} />)}</div>
    </>
  )
}