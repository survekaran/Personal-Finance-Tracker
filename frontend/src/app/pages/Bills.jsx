import { useEffect, useState } from 'react'
import { getBills, addBill, updateBill, deleteBill } from '../../lib/api'

export function Bills() {
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBills().then(data => {
      setBills(data)
      setLoading(false)
    })
  }, [])

  const handleTogglePaid = async (id, currentPaid) => {
    const updated = await updateBill(id, { paid: !currentPaid })
    setBills(bills.map(b => b.id === id ? updated : b))
  }

  const handleDelete = async (id) => {
    await deleteBill(id)
    setBills(bills.filter(b => b.id !== id))
  }

  if (loading) return <p>Loading bills...</p>

  return (
    <div>
      {/* your existing bills UI here */}
      {bills.map(bill => (
        <div key={bill.id}>{bill.name}</div>
      ))}
    </div>
  )
}