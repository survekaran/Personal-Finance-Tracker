const mongoose = require('mongoose')
const Transaction = require('../models/Transaction')

const isValidType = (value) => ['income', 'expense'].includes(value)
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id)

const badRequest = (res, message) => res.status(400).json({ error: message })

exports.createTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, category, date } = req.body

    if (!title || amount === undefined || !type || !category) {
      return badRequest(res, 'title, amount, type and category are required')
    }

    if (typeof amount !== 'number' || Number.isNaN(amount)) {
      return badRequest(res, 'amount must be a valid number')
    }

    if (!isValidType(type)) {
      return badRequest(res, 'type must be either income or expense')
    }

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      date,
    })

    res.status(201).json(transaction)
  } catch (error) {
    next(error)
  }
}

exports.getTransactions = async (req, res, next) => {
  try {
    const filter = {}
    const { type } = req.query

    if (type) {
      const normalizedType = String(type).toLowerCase()
      if (!isValidType(normalizedType)) {
        return badRequest(res, 'type query must be income or expense')
      }
      filter.type = normalizedType
    }

    const transactions = await Transaction.find(filter).sort({ date: -1, createdAt: -1 })
    res.json(transactions)
  } catch (error) {
    next(error)
  }
}

exports.updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) {
      return badRequest(res, 'Invalid transaction ID')
    }

    const updates = {}
    const { title, amount, type, category, date } = req.body

    if (title !== undefined) updates.title = title
    if (amount !== undefined) updates.amount = amount
    if (type !== undefined) updates.type = type
    if (category !== undefined) updates.category = category
    if (date !== undefined) updates.date = date

    if (Object.keys(updates).length === 0) {
      return badRequest(res, 'At least one field must be provided to update')
    }

    if (updates.amount !== undefined && (typeof updates.amount !== 'number' || Number.isNaN(updates.amount))) {
      return badRequest(res, 'amount must be a valid number')
    }

    if (updates.type !== undefined && !isValidType(updates.type)) {
      return badRequest(res, 'type must be either income or expense')
    }

    const transaction = await Transaction.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' })
    }

    res.json(transaction)
  } catch (error) {
    next(error)
  }
}

exports.deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) {
      return badRequest(res, 'Invalid transaction ID')
    }

    const transaction = await Transaction.findByIdAndDelete(id)
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' })
    }

    res.json({ message: 'Transaction deleted successfully' })
  } catch (error) {
    next(error)
  }
}

exports.getSummary = async (req, res, next) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0],
            },
          },
        },
      },
    ])

    const totals = summary[0] || { totalIncome: 0, totalExpense: 0 }
    res.json({
      totalIncome: totals.totalIncome,
      totalExpense: totals.totalExpense,
      balance: totals.totalIncome - totals.totalExpense,
    })
  } catch (error) {
    next(error)
  }
}
