import DashShell from '../components/DashShell'

export default function CustomerDash() {
  return <DashShell tabs={[['orders', 'My orders'], ['new', 'New order']]} />
}