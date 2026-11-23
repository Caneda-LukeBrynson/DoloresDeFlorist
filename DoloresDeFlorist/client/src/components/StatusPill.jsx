export default function StatusPill({ status }) {
  return <span className={`status s-${status.toLowerCase().replace(/\s+/g, '-')}`}>{status}</span>
}
