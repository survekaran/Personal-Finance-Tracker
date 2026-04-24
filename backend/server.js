const express = require('express')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./config/db')
const goalsRouter = require('./routes/goals')
const billsRouter = require('./routes/bills')
const transactionRouter = require('./routes/transactionRoutes')

const app = express()

connectDB().catch((error) => {
  console.error('MongoDB connection failed:', error.message)
  process.exit(1)
})

app.use(cors())
app.use(express.json())

app.use('/api/transactions', transactionRouter)
app.use('/api/goals', goalsRouter)
app.use('/api/bills', billsRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message || 'Server Error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})