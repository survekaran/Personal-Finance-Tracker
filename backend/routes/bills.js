const express = require('express')
const router = express.Router()
const supabase = require('../supabase')

// GET all bills
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('bills').select('*')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// POST add a new bill
router.post('/', async (req, res) => {
  const { name, amount, due_date, paid } = req.body
  const { data, error } = await supabase
    .from('bills')
    .insert([{ name, amount, due_date, paid }])
    .select()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data[0])
})

// PATCH toggle paid status
router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { paid } = req.body
  const { data, error } = await supabase
    .from('bills')
    .update({ paid })
    .eq('id', id)
    .select()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data[0])
})

// DELETE a bill
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const { error } = await supabase.from('bills').delete().eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: 'Bill deleted' })
})

module.exports = router