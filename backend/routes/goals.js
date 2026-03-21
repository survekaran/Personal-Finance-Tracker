const express = require('express')
const router = express.Router()
const supabase = require('../supabase')

// GET all goals
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('goals').select('*')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// POST add a new goal
router.post('/', async (req, res) => {
  const { name, target, saved, color } = req.body
  const { data, error } = await supabase
    .from('goals')
    .insert([{ name, target, saved, color }])
    .select()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data[0])
})

// PATCH update saved amount
router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { saved } = req.body
  const { data, error } = await supabase
    .from('goals')
    .update({ saved })
    .eq('id', id)
    .select()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data[0])
})

// DELETE a goal
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const { error } = await supabase.from('goals').delete().eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: 'Goal deleted' })
})

module.exports = router