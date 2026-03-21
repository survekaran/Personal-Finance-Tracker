const BASE_URL = 'http://localhost:5000/api'

// Goals
export const getGoals = async () => {
  const res = await fetch(`${BASE_URL}/goals`)
  return res.json()
}

export const addGoal = async (goal) => {
  const res = await fetch(`${BASE_URL}/goals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal)
  })
  return res.json()
}

export const updateGoal = async (id, data) => {
  const res = await fetch(`${BASE_URL}/goals/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const deleteGoal = async (id) => {
  const res = await fetch(`${BASE_URL}/goals/${id}`, {
    method: 'DELETE'
  })
  return res.json()
}

// Bills
export const getBills = async () => {
  const res = await fetch(`${BASE_URL}/bills`)
  return res.json()
}

export const addBill = async (bill) => {
  const res = await fetch(`${BASE_URL}/bills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bill)
  })
  return res.json()
}

export const updateBill = async (id, data) => {
  const res = await fetch(`${BASE_URL}/bills/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const deleteBill = async (id) => {
  const res = await fetch(`${BASE_URL}/bills/${id}`, {
    method: 'DELETE'
  })
  return res.json()
}