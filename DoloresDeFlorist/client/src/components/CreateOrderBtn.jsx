export default function CreateOrderBtn({ onClick, label = 'Create order' }) {
  return <button className="btn" onClick={onClick}>{label}</button>
}