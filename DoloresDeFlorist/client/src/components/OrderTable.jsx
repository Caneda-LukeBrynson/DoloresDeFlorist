import OrderRow from './OrderRow'

export default function OrderTable({ rows, onEdit }) {
  return (
    <div className="tw">
      <table>
        <thead><tr><th>No.</th><th>Customer</th><th>Order</th><th>Due</th><th>From</th><th>Status</th><th>Update</th></tr></thead>
        <tbody>{rows.map((o) => <OrderRow key={o.id} order={o} onEdit={onEdit} />)}</tbody>
      </table>
      {!rows.length && <p>No orders match.</p>}
    </div>
  )
}