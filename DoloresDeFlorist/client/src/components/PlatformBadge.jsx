export default function PlatformBadge({ platform }) {
  return <span className={`badge p-${platform.toLowerCase()}`}>{platform}</span>
}
