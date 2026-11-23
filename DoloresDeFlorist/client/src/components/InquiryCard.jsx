import PlatformBadge from './PlatformBadge'
import StatusPill from './StatusPill'

export default function InquiryCard({ inq, active, onClick }) {
  const last = inq.thread[inq.thread.length - 1]
  return (
    <button className={`icard ${active ? 'on' : ''}`} onClick={onClick}>
      <div className="row"><strong>{inq.name}</strong><PlatformBadge platform={inq.platform} /></div>
      <p>{last.text}</p>
      <StatusPill status={inq.status} />
    </button>
  )
}
