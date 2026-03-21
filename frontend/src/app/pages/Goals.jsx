import { useState, useEffect } from 'react';
import { Plus, Target, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { getGoals, addGoal, updateGoal } from '../../lib/api';

export function Goals() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newGoal, setNewGoal] = useState({ name: '', target: '', saved: '', color: '#22c55e' })
  const [addMoneyId, setAddMoneyId] = useState(null)
  const [addAmount, setAddAmount] = useState('')

  useEffect(() => {
    getGoals().then(data => {
      setGoals(data)
      setLoading(false)
    })
  }, [])

  const handleAddGoal = async () => {
    if (!newGoal.name || !newGoal.target) return
    const created = await addGoal({
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      saved: parseFloat(newGoal.saved) || 0,
      color: newGoal.color
    })
    setGoals([...goals, created])
    setNewGoal({ name: '', target: '', saved: '', color: '#22c55e' })
    setShowForm(false)
  }

  const handleAddMoney = async (goal) => {
    if (!addAmount) return
    const newSaved = goal.saved + parseFloat(addAmount)
    const updated = await updateGoal(goal.id, { saved: newSaved })
    setGoals(goals.map(g => g.id === goal.id ? updated : g))
    setAddMoneyId(null)
    setAddAmount('')
  }

  if (loading) return <p className="p-8">Loading goals...</p>

  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return (
    <div className="p-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Savings Goals</h1>
          <p className="text-gray-600 mt-1">Track your progress toward financial goals</p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" />
          Create New Goal
        </Button>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <Card className="p-6 border-green-200 bg-green-50">
          <h3 className="font-semibold text-gray-900 mb-4">Create New Goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Goal Name</label>
              <input
                type="text"
                placeholder="e.g. Emergency Fund"
                value={newGoal.name}
                onChange={e => setNewGoal({ ...newGoal, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Target Amount ($)</label>
              <input
                type="number"
                placeholder="e.g. 10000"
                value={newGoal.target}
                onChange={e => setNewGoal({ ...newGoal, target: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Already Saved ($)</label>
              <input
                type="number"
                placeholder="0"
                value={newGoal.saved}
                onChange={e => setNewGoal({ ...newGoal, saved: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={newGoal.color}
                  onChange={e => setNewGoal({ ...newGoal, color: e.target.value })}
                  className="w-10 h-10 rounded cursor-pointer border border-gray-300"
                />
                <span className="text-sm text-gray-600">Pick a color for this goal</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddGoal} className="flex-1">Save Goal</Button>
            <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">Cancel</Button>
          </div>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 opacity-90" />
            <div className="text-sm opacity-90">Active Goals</div>
          </div>
          <div className="text-3xl font-semibold">{goals.length}</div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Total Target</div>
          <div className="text-3xl font-semibold text-gray-900">${totalTarget.toLocaleString()}</div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Total Saved</div>
          <div className="text-3xl font-semibold text-gray-900">${totalSaved.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+15% this month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Overall Progress</div>
          <div className="text-3xl font-semibold text-gray-900">{overallProgress.toFixed(0)}%</div>
          <Progress value={overallProgress} className="h-1.5 mt-2" />
        </Card>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const percentage = Math.min((goal.saved / goal.target) * 100, 100);
          const remaining = goal.target - goal.saved;

          return (
            <Card key={goal.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${goal.color}20` }}
                  >
                    <Target className="w-6 h-6" style={{ color: goal.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{goal.name}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-gray-900">{percentage.toFixed(0)}%</div>
                  <div className="text-xs text-gray-600">Complete</div>
                </div>
              </div>

              <div className="space-y-3">
                <Progress value={percentage} className="h-4" />

                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Saved</div>
                    <div className="font-semibold text-gray-900">${goal.saved.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Target</div>
                    <div className="font-semibold text-gray-900">${goal.target.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Remaining</div>
                    <div className="font-semibold text-orange-600">${remaining.toLocaleString()}</div>
                  </div>
                </div>

                {/* Add Money inline form */}
                {addMoneyId === goal.id ? (
                  <div className="flex gap-2 pt-3">
                    <input
                      type="number"
                      placeholder="Amount to add ($)"
                      value={addAmount}
                      onChange={e => setAddAmount(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500"
                    />
                    <Button size="sm" onClick={() => handleAddMoney(goal)} style={{ backgroundColor: goal.color }}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => { setAddMoneyId(null); setAddAmount('') }}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2 pt-3">
                    <Button variant="outline" size="sm" className="flex-1">Edit Goal</Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      style={{ backgroundColor: goal.color }}
                      onClick={() => setAddMoneyId(goal.id)}
                    >
                      Add Money
                    </Button>
                  </div>
                )}
              </div>

              {percentage >= 100 && (
                <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm text-green-800 font-medium">🎉 You've reached this goal!</p>
                </div>
              )}
              {percentage >= 80 && percentage < 100 && (
                <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-sm text-blue-800">🚀 Almost there! Just ${remaining.toLocaleString()} more!</p>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {goals.length === 0 && (
        <Card className="p-12 text-center border-dashed border-2">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">No goals yet</h3>
          <p className="text-gray-600 mb-4">Create your first savings goal to get started.</p>
          <Button className="gap-2" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4" />
            Add New Goal
          </Button>
        </Card>
      )}

    </div>
  );
}