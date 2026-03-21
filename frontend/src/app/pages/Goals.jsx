import { useEffect, useState } from 'react'
import { getGoals, addGoal, updateGoal, deleteGoal } from '../../lib/api'

export default function Goals() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getGoals().then(data => {
      setGoals(data)
      setLoading(false)
    })
  }, [])

  const handleAdd = async (newGoal) => {
    const created = await addGoal(newGoal)
    setGoals([...goals, created])
  }

  const handleUpdate = async (id, data) => {
    const updated = await updateGoal(id, data)
    setGoals(goals.map(g => g.id === id ? updated : g))
  }

  const handleDelete = async (id) => {
    await deleteGoal(id)
    setGoals(goals.filter(g => g.id !== id))
  }

  if (loading) return <p>Loading goals...</p>

  return (
    <div>
      {/* your existing goals UI here */}
      {goals.map(goal => (
        <div key={goal.id}>{goal.name}</div>
      ))}
    </div>
  )
}