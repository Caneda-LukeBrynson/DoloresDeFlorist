import { useState, useEffect } from 'react'
import { StoreProvider } from './store'
import Home from './pages/Home'
import WebOrderForm from './pages/WebOrderForm'
import OrderTracking from './pages/OrderTracking'
import Dash from './pages/Dash'

export default function App() {
  const [route, setRoute] = useState(() => (location.hash.startsWith('#/') ? location.hash.slice(1) : '/'))
  useEffect(() => {
    const f = () => { if (location.hash.startsWith('#/')) { setRoute(location.hash.slice(1)); window.scrollTo(0, 0) } }
    addEventListener('hashchange', f)
    return () => removeEventListener('hashchange', f)
  }, [])
  const [, page, arg] = route.split('/')
  return (
    <StoreProvider>
      {page === 'order' ? <WebOrderForm />
        : page === 'track' ? <OrderTracking code={arg} />
        : page === 'owner' ? <Dash tab={arg} />
        : <Home />}
    </StoreProvider>
  )
}
