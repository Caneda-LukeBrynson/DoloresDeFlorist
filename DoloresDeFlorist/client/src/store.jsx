import { createContext, useContext, useState } from 'react'

// Demo values. Change these to match the shop.
export const MAX_PER_DAY = 3
export const STATUSES = ['Awaiting approval', 'Preparing', 'Out for delivery', 'Delivered', 'Completed', 'Cancelled', 'Declined']
export const ARRANGEMENTS = [
  { name: 'Cream Rose Bouquet', price: 1800, uses: { rose: 12 } },
  { name: 'Garden Hat Box', price: 2200, uses: { rose: 8, hydrangea: 3 } },
  { name: 'Baby’s Breath Bundle', price: 1200, uses: { gyp: 6 } },
  { name: 'Hydrangea Gift Basket', price: 2800, uses: { hydrangea: 6, rose: 4 } },
]
const day = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toLocaleDateString('en-CA') }
export const dayCount = (orders, d) => orders.filter((o) => o.due === d && !['Cancelled', 'Declined'].includes(o.status)).length
const o = (id, customer, item, qty, price, due, address, status, source) => ({ id, customer, item, qty, price, due, address, status, source })

const inquiries = [
  { id: 1, platform: 'Facebook', name: 'Maria Santos', status: 'New', thread: [{ from: 'customer', text: 'Hi, do you have roses for tomorrow? 1 bouquet po.' }] },
  { id: 2, platform: 'Instagram', name: 'Jenny Lim', status: 'New', thread: [{ from: 'customer', text: 'How much po the hat box? For my mom’s birthday on Saturday.' }] },
  { id: 3, platform: 'Facebook', name: 'Ana Reyes', status: 'Replied', thread: [{ from: 'customer', text: 'Do you deliver to Minglanilla?' }, { from: 'owner', text: 'Yes po, we can deliver there.' }] },
  { id: 4, platform: 'Other', name: 'Kim Dela Cruz', status: 'New', thread: [{ from: 'customer', text: 'Hello, can I order a bouquet for Friday?' }] },
]
const orders0 = [
  o('DDF-1001', 'Rosa Tan', 'Cream Rose Bouquet', 1, 1800, day(0), 'Naga City', 'Out for delivery', 'Facebook'),
  o('DDF-1002', 'Ben Cruz', 'Garden Hat Box', 1, 2200, day(1), 'Naga City', 'Preparing', 'Instagram'),
  o('DDF-1003', 'Liza Go', 'Baby’s Breath Bundle', 2, 2400, day(-1), 'Naga City', 'Delivered', 'Web'),
  o('DDF-1004', 'Joy Lee', 'Hydrangea Gift Basket', 1, 2800, day(3), 'Naga City', 'Awaiting approval', 'Web'),
  o('DDF-1005', 'Carl Uy', 'Cream Rose Bouquet', 1, 1800, day(1), 'Talisay', 'Preparing', 'Facebook'),
  o('DDF-1006', 'Mia Dy', 'Baby’s Breath Bundle', 1, 1200, day(1), 'Naga City', 'Preparing', 'Web'),
]
const stock0 = [
  { id: 'rose', name: 'Roses (stems)', qty: 30, min: 10 },
  { id: 'hydrangea', name: 'Hydrangea (stems)', qty: 5, min: 4 },
  { id: 'gyp', name: 'Baby’s breath (bunches)', qty: 20, min: 6 },
  { id: 'wrap', name: 'Wrapping paper (sheets)', qty: 8, min: 10 },
]

const Ctx = createContext()
export const useStore = () => useContext(Ctx)

export function StoreProvider({ children }) {
  const [inq, setInq] = useState(inquiries)
  const [orders, setOrders] = useState(orders0)
  const [stock, setStock] = useState(stock0)
  const [notifs, setNotifs] = useState([])
  const note = (text) => setNotifs((n) => [{ id: Math.random(), text }, ...n])
  const full = (d) => dayCount(orders, d) >= MAX_PER_DAY
  const reserve = (x) => {
    const a = ARRANGEMENTS.find((r) => r.name === x.item)
    if (a) setStock((s) => s.map((i) => (a.uses[i.id] ? { ...i, qty: Math.max(0, i.qty - a.uses[i.id] * x.qty) } : i)))
  }
  const addOrder = (x) => { const order = { ...x, id: 'DDF-' + (1001 + orders.length) }; setOrders((l) => [...l, order]); return order }
  const missing = (x) => !x.customer || !x.item || !x.qty || !x.due || !x.address

  const value = {
    inquiries: inq, orders, stock, notifs,
    reply: (id, text) => setInq((l) => l.map((i) => (i.id === id ? { ...i, status: i.status === 'Handled' ? 'Handled' : 'Replied', thread: [...i.thread, { from: 'owner', text }] } : i))),
    handle: (id) => setInq((l) => l.map((i) => (i.id === id ? { ...i, status: 'Handled' } : i))),
    createOrder: (x, inqId) => {
      if (missing(x)) return { error: 'Fill in all order details first.' }
      if (full(x.due)) return { error: `${x.due} is already full. Choose another day.` }
      reserve(x)
      const order = addOrder({ ...x, status: 'Preparing' })
      if (inqId) setInq((l) => l.map((i) => (i.id === inqId ? { ...i, status: 'Handled' } : i)))
      return { order }
    },
    submitWeb: (x) => {
      if (missing(x) || !x.contact) return { error: 'Please fill in every field.' }
      if (full(x.due)) return { error: 'That day is fully booked. Please pick another date.' }
      const order = addOrder({ ...x, source: 'Web', status: 'Awaiting approval' })
      note(`New web order ${order.id} from ${x.customer}`)
      return { order }
    },
    updateOrder: (id, x) => {
      if (missing(x)) return { error: 'Fill in all order details first.' }
      const cur = orders.find((o) => o.id === id)
      if (x.due !== cur.due && full(x.due)) return { error: `${x.due} is already full. Choose another day.` }
      setOrders((l) => l.map((o) => (o.id === id ? { ...o, ...x } : o)))
      return { order: { ...cur, ...x } }
    },
    setStatus: (id, status) => setOrders((l) => l.map((x) => (x.id === id ? { ...x, status } : x))),
    accept: (id) => { reserve(orders.find((x) => x.id === id)); setOrders((l) => l.map((x) => (x.id === id ? { ...x, status: 'Preparing' } : x))) },
    received: (id) => { setOrders((l) => l.map((x) => (x.id === id ? { ...x, status: 'Completed' } : x))); note(`${id} was confirmed received by the customer`) },
    setQty: (id, qty) => setStock((s) => s.map((i) => (i.id === id ? { ...i, qty } : i))),
    addStock: (name, qty, min) => setStock((s) => [...s, { id: name.toLowerCase().replace(/\W+/g, '-'), name, qty, min }]),
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}