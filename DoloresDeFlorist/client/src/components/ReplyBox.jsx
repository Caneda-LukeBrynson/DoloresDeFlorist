import { useState } from 'react'

export default function ReplyBox({ onSend }) {
  const [t, setT] = useState('')
  const send = () => { if (t.trim()) { onSend(t.trim()); setT('') } }
  return (
    <div className="field">
      <textarea rows="2" value={t} onChange={(e) => setT(e.target.value)} placeholder="Type a reply" aria-label="Reply" />
      <button className="btn" onClick={send}>Send reply</button>
    </div>
  )
}
