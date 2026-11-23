import MessageThread from './MessageThread'
import ReplyBox from './ReplyBox'
import ActionBox from './ActionBox'
import PlatformBadge from './PlatformBadge'

export default function ReplyPanel({ inq, onReply, onHandled, onOrder }) {
  if (!inq) return <aside className="panel"><p>Select an inquiry to read and reply.</p></aside>
  return (
    <aside className="panel">
      <div className="row"><h3>{inq.name}</h3><PlatformBadge platform={inq.platform} /></div>
      <MessageThread thread={inq.thread} />
      <ReplyBox onSend={onReply} />
      <ActionBox inq={inq} onHandled={onHandled} onOrder={onOrder} />
    </aside>
  )
}
