import InquiryCard from './InquiryCard'

export default function InquiryList({ items, selectedId, onSelect }) {
  return (
    <div className="ilist">
      {items.map((i) => <InquiryCard key={i.id} inq={i} active={i.id === selectedId} onClick={() => onSelect(i.id)} />)}
    </div>
  )
}
