import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sun, Moon, Plus, Trash2, Edit2, 
  ArrowUpCircle, ArrowDownCircle, 
  Utensils, Car, Lightbulb, ShoppingBag, 
  Briefcase, MoreHorizontal, Wallet, Check
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

// Categories with icons and colors
const CATEGORIES = {
  Food: { icon: <Utensils size={18} />, color: '#F87171' }, // red-400
  Travel: { icon: <Car size={18} />, color: '#60A5FA' }, // blue-400
  Bills: { icon: <Lightbulb size={18} />, color: '#FBBF24' }, // amber-400
  Shopping: { icon: <ShoppingBag size={18} />, color: '#A78BFA' }, // purple-400
  Salary: { icon: <Briefcase size={18} />, color: '#34D399' }, // emerald-400
  Other: { icon: <MoreHorizontal size={18} />, color: '#9CA3AF' } // gray-400
};

const CHART_COLORS = ['#F87171', '#60A5FA', '#FBBF24', '#A78BFA', '#34D399', '#9CA3AF'];

export function FinanceDashboard({ theme, toggleTheme }) {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [editingId, setEditingId] = useState(null);
  
  const [isAnimating, setIsAnimating] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('finance-transactions');
    if (saved) {
      try {
        setTransactions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse transactions", e);
      }
    }
  }, []);

  // Save to local storage whenever transactions change
  useEffect(() => {
    localStorage.setItem('finance-transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Calculations
  const { totalIncome, totalExpense, balance } = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        const val = parseFloat(curr.amount) || 0;
        if (curr.type === 'income') {
          acc.totalIncome += val;
          acc.balance += val;
        } else {
          acc.totalExpense += val;
          acc.balance -= val;
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0, balance: 0 }
    );
  }, [transactions]);

  // Chart Data
  const chartData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + parseFloat(curr.amount);
      return acc;
    }, {});

    return Object.keys(categoryTotals).map((cat, index) => ({
      name: cat,
      value: categoryTotals[cat],
      color: CATEGORIES[cat]?.color || CHART_COLORS[index % CHART_COLORS.length]
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount || isNaN(amount) || amount <= 0) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);

    const newTx = {
      id: editingId || Date.now().toString(),
      title,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString(),
    };

    if (editingId) {
      setTransactions(transactions.map(t => t.id === editingId ? newTx : t));
      setEditingId(null);
    } else {
      setTransactions([newTx, ...transactions]);
    }

    setTitle('');
    setAmount('');
  };

  const handleEdit = (tx) => {
    setEditingId(tx.id);
    setTitle(tx.title);
    setAmount(tx.amount.toString());
    setType(tx.type);
    setCategory(tx.category);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setAmount('');
  };

  // Feedback logic
  const feedbackMessage = useMemo(() => {
    if (totalIncome === 0 && totalExpense === 0) return "Add some transactions to get started!";
    if (totalExpense > totalIncome && totalIncome > 0) return "High spending alert! You are spending more than you earn.";
    if (totalExpense === 0 && totalIncome > 0) return "You're saving 100%! Awesome job.";
    
    const savingsRate = ((totalIncome - totalExpense) / totalIncome) * 100;
    if (savingsRate > 20) return "You're saving well this month! Keep it up.";
    if (savingsRate > 0) return "You're in the green, but watch your expenses.";
    return "Your balance is negative. Time to budget!";
  }, [totalIncome, totalExpense]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric' 
    });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen shadow-2xl bg-white dark:bg-[#1A1A24] sm:my-8 sm:rounded-3xl overflow-hidden flex flex-col relative transition-colors duration-300">
      
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <Wallet size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Finance Tracker</h1>
        </div>
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide px-6 space-y-6">
        
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 text-white shadow-[0_8px_30px_rgba(37,99,235,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -ml-8 -mb-8"></div>
          
          <div className="relative z-10">
            <p className="text-blue-100 text-sm font-medium mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold tracking-tight mb-6">{formatCurrency(balance)}</h2>
            
            <div className="flex justify-between items-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <ArrowUpCircle size={20} className="text-green-300" />
                </div>
                <div>
                  <p className="text-xs text-blue-100">Income</p>
                  <p className="font-semibold text-green-100">{formatCurrency(totalIncome)}</p>
                </div>
              </div>
              
              <div className="w-px h-8 bg-white/20"></div>
              
              <div className="flex items-center gap-3">
                <div className="bg-red-500/20 p-2 rounded-full">
                  <ArrowDownCircle size={20} className="text-red-300" />
                </div>
                <div>
                  <p className="text-xs text-blue-100">Expense</p>
                  <p className="font-semibold text-red-100">{formatCurrency(totalExpense)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Feedback */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl p-4 flex gap-3 items-center">
          <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full text-blue-600 dark:text-blue-300 shrink-0">
            <Lightbulb size={18} />
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
            {feedbackMessage}
          </p>
        </div>

        {/* Spending Progress Bar */}
        {totalIncome > 0 && (
          <div className="px-1 py-1">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
              <span>Spending vs Income</span>
              <span className={totalExpense > totalIncome ? 'text-red-500' : ''}>
                {((totalExpense / totalIncome) * 100).toFixed(0)}% Spent
              </span>
            </div>
            <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  totalExpense > totalIncome ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min((totalExpense / totalIncome) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Add Transaction */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-5 border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {editingId ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="flex bg-gray-200/50 dark:bg-gray-900/50 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  type === 'expense' 
                    ? 'bg-white dark:bg-gray-700 text-red-500 shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setType('income')}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  type === 'income' 
                    ? 'bg-white dark:bg-gray-700 text-green-500 shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Income
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="What was it for? (e.g. Groceries)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
              
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl pl-8 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
                
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all"
                >
                  {Object.keys(CATEGORIES).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className={`flex-1 py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-lg ${
                  editingId 
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25' 
                    : type === 'expense' 
                      ? 'bg-red-500 hover:bg-red-600 shadow-red-500/25' 
                      : 'bg-green-500 hover:bg-green-600 shadow-green-500/25'
                } ${isAnimating ? 'scale-95' : 'scale-100'}`}
              >
                {editingId ? <><Check size={20} /> Update</> : <><Plus size={20} /> Add</>}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-3.5 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Analytics Section */}
        {chartData.length > 0 && (
          <div className="bg-white dark:bg-[#1A1A24] py-2">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Expense Analytics</h3>
            <div className="h-56 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                <span className="text-xs text-gray-500 dark:text-gray-400">Total Spent</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(totalExpense)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            {transactions.length > 0 && (
              <span className="text-sm text-gray-500 dark:text-gray-400">{transactions.length} total</span>
            )}
          </div>
          
          {transactions.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/30 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
              <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wallet className="text-gray-400 dark:text-gray-500" size={24} />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">No transactions yet</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Add your first income or expense above</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div 
                  key={tx.id} 
                  className="bg-white dark:bg-[#222230] p-4 rounded-2xl border border-gray-100 dark:border-gray-800/80 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-inner"
                        style={{ backgroundColor: CATEGORIES[tx.category]?.color || '#9CA3AF' }}
                      >
                        {CATEGORIES[tx.category]?.icon || <MoreHorizontal size={20} />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{tx.title}</h4>
                        <div className="flex gap-2 items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">{tx.category}</span>
                          <span>•</span>
                          <span>{formatDate(tx.date)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-bold text-lg ${tx.type === 'income' ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </p>
                      
                      {/* Actions - show on hover or always on mobile */}
                      <div className="flex gap-2 justify-end mt-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(tx)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(tx.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
