import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './auth'
import { StoreProvider } from './store'
import RequireRole from './components/RequireRole'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import OrderTracking from './pages/OrderTracking'
import Dash from './pages/Dash'
import InquiryDash from './pages/InquiryDash'
import OrderDash from './pages/OrderDash'
import WebOrders from './pages/WebOrders'
import Calendar from './pages/Calendar'
import Stock from './pages/Stock'
import Notifications from './pages/Notifications'
import CustomerDash from './pages/CustomerDash'
import MyOrders from './pages/MyOrders'
import WebOrderForm from './pages/WebOrderForm'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return (
    <AuthProvider>
      <StoreProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="/track" element={<OrderTracking />} />
          <Route path="/track/:code" element={<OrderTracking />} />

          <Route path="/owner" element={<RequireRole role="owner"><Dash /></RequireRole>}>
            <Route index element={<Navigate to="inquiries" replace />} />
            <Route path="inquiries" element={<InquiryDash />} />
            <Route path="orders" element={<OrderDash />} />
            <Route path="web" element={<WebOrders />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="stock" element={<Stock />} />
            <Route path="alerts" element={<Notifications />} />
          </Route>

          <Route path="/customer" element={<RequireRole role="customer"><CustomerDash /></RequireRole>}>
            <Route index element={<Navigate to="orders" replace />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="new" element={<WebOrderForm />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </StoreProvider>
    </AuthProvider>
  )
}