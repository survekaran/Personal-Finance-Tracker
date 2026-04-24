const express = require('express')
const router = express.Router()
const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getSummary,
} = require('../controllers/transactionController')

router.get('/summary', getSummary)
router.route('/').get(getTransactions).post(createTransaction)
router.put('/:id', updateTransaction)
router.delete('/:id', deleteTransaction)

module.exports = router
