import { useState } from 'react'
import { useStore } from '../store'
import InquiryList from '../components/InquiryList'
import ReplyPanel from '../components/ReplyPanel'
import OrderForm from '../components/OrderForm'

export default function InquiryDash() {
  const { inquiries, reply, handle } = useStore()
  const [sel, setSel] = useState(null)
  const [creating, setCreating] = useState(false)
  const [made, setMade] = useState(null)
  const inq = inquiries.find((i) => i.id === sel)
  const link = made ? `${location.origin}/track/${made.id}` : ''
  return (
    <>
      <h1>Inquiries</h1>
      <div className="split">
        <InquiryList items={inquiries} selectedId={sel} onSelect={(id) => { setSel(id); setCreating(false); setMade(null) }} />
        {creating && inq ? (
          <OrderForm inq={inq} onDone={(o) => { setCreating(false); setMade(o) }} />
        ) : made && inq ? (
          <div className="panel">
            <h3>Order {made.id} created</h3>
            <p>Send {made.customer} the order link so they can track the order and confirm when it arrives.</p>
            <div className="field"><input readOnly value={link} aria-label="Order link" onFocus={(e) => e.target.select()} /></div>
            <div className="actions">
              <button className="btn" onClick={() => { reply(inq.id, `Hi ${made.customer}, your order ${made.id} is confirmed. Track it here: ${link}`); setMade(null) }}>Send link in reply</button>
              <button className="pill" onClick={() => setMade(null)}>Close</button>
            </div>
          </div>
        ) : (
          <ReplyPanel inq={inq} onReply={(t) => reply(inq.id, t)} onHandled={() => handle(inq.id)} onOrder={() => setCreating(true)} />
        )}
      </div>
    </>
  )
}