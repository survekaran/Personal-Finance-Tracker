// Mock data for the Personal Finance Tracker

// Transactions
export const transactions = [
  { id: '1', date: '2026-03-19', description: 'Salary Deposit', category: 'Salary', amount: 5000, type: 'income' },
  { id: '2', date: '2026-03-18', description: 'Grocery Shopping', category: 'Food', amount: -120, type: 'expense' },
  { id: '3', date: '2026-03-17', description: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, type: 'expense' },
  { id: '4', date: '2026-03-16', description: 'Uber Ride', category: 'Transport', amount: -25.50, type: 'expense' },
  { id: '5', date: '2026-03-15', description: 'Freelance Project', category: 'Freelance', amount: 850, type: 'income' },
  { id: '6', date: '2026-03-14', description: 'Electric Bill', category: 'Utilities', amount: -89.99, type: 'expense' },
  { id: '7', date: '2026-03-13', description: 'Coffee Shop', category: 'Food', amount: -12.50, type: 'expense' },
  { id: '8', date: '2026-03-12', description: 'Gym Membership', category: 'Health', amount: -45, type: 'expense' },
  { id: '9', date: '2026-03-11', description: 'Online Course', category: 'Education', amount: -99, type: 'expense' },
  { id: '10', date: '2026-03-10', description: 'Restaurant', category: 'Food', amount: -67.80, type: 'expense' },
];

// Goals
export const goals = [
  { id: '1', name: 'Emergency Fund', target: 10000, current: 6500, deadline: '2026-12-31', color: '#3b82f6' },
  { id: '2', name: 'Vacation to Japan', target: 5000, current: 2300, deadline: '2026-08-15', color: '#8b5cf6' },
  { id: '3', name: 'New Laptop', target: 2000, current: 1650, deadline: '2026-06-01', color: '#10b981' },
  { id: '4', name: 'Investment Portfolio', target: 15000, current: 4200, deadline: '2027-01-01', color: '#f59e0b' },
];

// Bills & Subscriptions
export const bills = [
  { id: '1', name: 'Rent', amount: 1200, dueDate: '2026-04-01', category: 'Housing', isPaid: false, isRecurring: true },
  { id: '2', name: 'Netflix', amount: 15.99, dueDate: '2026-03-22', category: 'Entertainment', isPaid: false, isRecurring: true },
  { id: '3', name: 'Spotify', amount: 9.99, dueDate: '2026-03-25', category: 'Entertainment', isPaid: true, isRecurring: true },
  { id: '4', name: 'Internet', amount: 59.99, dueDate: '2026-03-28', category: 'Utilities', isPaid: false, isRecurring: true },
  { id: '5', name: 'Phone Bill', amount: 45, dueDate: '2026-03-30', category: 'Utilities', isPaid: false, isRecurring: true },
  { id: '6', name: 'Car Insurance', amount: 120, dueDate: '2026-04-05', category: 'Insurance', isPaid: false, isRecurring: true },
];

// Debts
export const debts = [
  { id: '1', name: 'Credit Card - Chase', total: 3500, paid: 1200, interestRate: 18.99, type: 'Credit Card' },
  { id: '2', name: 'Student Loan', total: 25000, paid: 8500, interestRate: 4.5, type: 'Student Loan' },
  { id: '3', name: 'Car Loan', total: 18000, paid: 6000, interestRate: 5.2, type: 'Auto Loan' },
];

// Budget Categories
export const budgets = [
  { category: 'Food', limit: 500, spent: 200.30, color: '#ef4444' },
  { category: 'Transport', limit: 200, spent: 125.50, color: '#3b82f6' },
  { category: 'Entertainment', limit: 150, spent: 115.99, color: '#8b5cf6' },
  { category: 'Utilities', limit: 300, spent: 89.99, color: '#f59e0b' },
  { category: 'Health', limit: 100, spent: 45, color: '#10b981' },
  { category: 'Shopping', limit: 400, spent: 320, color: '#ec4899' },
];

// Monthly data for charts
export const monthlyData = [
  { month: 'Jan', income: 5200, expenses: 3800 },
  { month: 'Feb', income: 5400, expenses: 4100 },
  { month: 'Mar', income: 5850, expenses: 3200 },
  { month: 'Apr', income: 5000, expenses: 3600 },
  { month: 'May', income: 6100, expenses: 4200 },
  { month: 'Jun', income: 5500, expenses: 3900 },
];

// Spending by category (for pie chart)
export const spendingByCategory = [
  { name: 'Food', value: 200.30, color: '#ef4444' },
  { name: 'Transport', value: 125.50, color: '#3b82f6' },
  { name: 'Entertainment', value: 115.99, color: '#8b5cf6' },
  { name: 'Utilities', value: 89.99, color: '#f59e0b' },
  { name: 'Health', value: 45, color: '#10b981' },
  { name: 'Shopping', value: 320, color: '#ec4899' },
  { name: 'Education', value: 99, color: '#06b6d4' },
];

// Summary calculations
export const calculateSummary = () => {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0));
  const totalSaved = goals.reduce((sum, g) => sum + g.current, 0);
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalDebt = debts.reduce((sum, d) => sum + (d.total - d.paid), 0);
  
  return {
    totalSaved,
    netWorth: totalSaved - totalDebt,
    monthlyIncome: totalIncome,
    monthlySpending: totalExpenses,
    budgetRemaining: totalBudget - totalSpent,
    totalDebt,
  };
};
