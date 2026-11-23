export default function MessageThread({ thread }) {
  return <div className="thread">{thread.map((m, i) => <p key={i} className={`msg ${m.from}`}>{m.text}</p>)}</div>
}
