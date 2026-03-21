const express = require('express')
const cors = require('cors')
require('dotenv').config()

const goalsRouter = require('./routes/goals')
const billsRouter = require('./routes/bills')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/goals', goalsRouter)
app.use('/api/bills', billsRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})