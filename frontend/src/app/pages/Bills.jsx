import { useState, useEffect } from 'react';
import { Calendar, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { getBills, updateBill, addBill } from '../../lib/api';

export function Bills() {
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newBill, setNewBill] = useState({ name: '', amount: '', due_date: '' })

  useEffect(() => {
    getBills().then(data => {
      setBills(data)
      setLoading(false)
    })
  }, [])

  // ALL functions must be ABOVE the if(loading) return
  const handleMarkPaid = async (id, currentPaid) => {
    const updated = await updateBill(id, { paid: !currentPaid })
    setBills(bills.map(b => b.id === id ? updated : b))
  }

  const handleAddBill = async () => {
    if (!newBill.name || !newBill.amount || !newBill.due_date) return
    const created = await addBill({
      name: newBill.name,
      amount: parseFloat(newBill.amount),
      due_date: newBill.due_date,
      paid: false
    })
    setBills([...bills, created])
    setNewBill({ name: '', amount: '', due_date: '' })
    setShowForm(false)
  }

  const getDaysUntilDue = (dueDate) => {
    return Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  };

  if (loading) return <p className="p-8">Loading bills...</p>

  const upcomingBills = bills.filter(b => !b.paid);
  const paidBills = bills.filter(b => b.paid);
  const totalUpcoming = upcomingBills.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="p-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Bills & Subscriptions</h1>
          <p className="text-gray-600 mt-1">Manage your recurring payments and bills</p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <DollarSign className="w-4 h-4" />
          Add Bill
        </Button>
      </div>

      {/* Add Bill Form */}
      {showForm && (
        <Card className="p-6 border-blue-200 bg-blue-50">
          <h3 className="font-semibold text-gray-900 mb-4">Add New Bill</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Bill Name</label>
              <input
                type="text"
                placeholder="e.g. Electricity"
                value={newBill.name}
                onChange={e => setNewBill({ ...newBill, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Amount ($)</label>
              <input
                type="number"
                placeholder="0.00"
                value={newBill.amount}
                onChange={e => setNewBill({ ...newBill, amount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Due Date</label>
              <input
                type="date"
                value={newBill.due_date}
                onChange={e => setNewBill({ ...newBill, due_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddBill} className="flex-1">Save Bill</Button>
            <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">Cancel</Button>
          </div>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-600 text-white border-0">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 opacity-90" />
            <div className="text-sm opacity-90">Due Soon</div>
          </div>
          <div className="text-3xl font-semibold">{upcomingBills.length}</div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Total Upcoming</div>
          <div className="text-3xl font-semibold text-gray-900">${totalUpcoming.toFixed(2)}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div className="text-sm text-gray-600">Paid This Month</div>
          </div>
          <div className="text-3xl font-semibold text-gray-900">{paidBills.length}</div>
        </Card>
      </div>

      {/* Upcoming Bills */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Bills</h2>
          <span className="text-sm text-gray-600">{upcomingBills.length} bills due</span>
        </div>

        {upcomingBills.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-gray-600">No upcoming bills. You're all caught up! ✅</p>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingBills.map((bill) => {
            const daysUntil = getDaysUntilDue(bill.due_date);
            const isUrgent = daysUntil <= 3;
            const isWarning = daysUntil > 3 && daysUntil <= 7;

            return (
              <Card
                key={bill.id}
                className={`p-5 ${isUrgent ? 'border-red-200 bg-red-50' : isWarning ? 'border-amber-200 bg-amber-50' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isUrgent ? 'bg-red-100' : isWarning ? 'bg-amber-100' : 'bg-blue-100'}`}>
                      <DollarSign className={`w-6 h-6 ${isUrgent ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{bill.name}</h3>
                    </div>
                  </div>
                  <div className="text-xl font-semibold text-gray-900">${bill.amount.toFixed(2)}</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Due: {new Date(bill.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${isUrgent ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-gray-600'}`}>
                    {daysUntil === 0 ? 'Due today' : daysUntil === 1 ? 'Due tomorrow' : `${daysUntil} days left`}
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                  <Button size="sm" className="flex-1" onClick={() => handleMarkPaid(bill.id, bill.paid)}>
                    Mark as Paid
                  </Button>
                </div>

                {isUrgent && (
                  <div className="mt-3 p-2 rounded-lg bg-red-100 border border-red-200">
                    <p className="text-sm text-red-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Payment due soon!
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Paid Bills */}
      {paidBills.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Paid Bills</h2>
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Bill Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">Amount</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paidBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{bill.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(bill.due_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">${bill.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Paid
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

    </div>
  );
}