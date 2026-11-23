export default function ActionBox({ inq, onHandled, onOrder }) {
  return (
    <div className="actions">
      <button className="btn" onClick={onOrder}>Create order</button>
      <button className="pill" onClick={onHandled} disabled={inq.status === 'Handled'}>Mark as handled</button>
    </div>
  )
}
