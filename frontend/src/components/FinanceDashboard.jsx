import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Home,
  TrendingDown,
  TrendingUp,
  Target,
  Calendar as CalendarIcon,
  BarChart3,
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api/transactions';

const CATEGORIES = {
  Food: { color: '#f87171' },
  Travel: { color: '#60a5fa' },
  Bills: { color: '#fbbf24' },
  Shopping: { color: '#a78bfa' },
  Salary: { color: '#34d399' },
  Other: { color: '#94a3b8' },
};

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'overview', label: 'Monthly Overview', icon: Home },
    { id: 'expenses', label: 'Expenses', icon: TrendingDown },
    { id: 'income', label: 'Income', icon: TrendingUp },
    { id: 'budgets', label: 'Budgets', icon: Target },
    { id: 'planning', label: 'Planning', icon: CalendarIcon },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">Finance Tracker</h1>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeSection === item.id
                      ? 'bg-[#C05746] text-white'
                      : 'text-gray-600 hover:bg-[#D0E3C4]'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export function FinanceDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [activeSection, setActiveSection] = useState('overview');
  const [currentMonth, setCurrentMonth] = useState('April');
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_BASE}/${editingId}` : API_BASE;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          amount: parseFloat(amount),
          type,
          category,
        }),
      });

      if (!res.ok) throw new Error('Failed to save');
      
      setTitle('');
      setAmount('');
      setType('expense');
      setCategory('Food');
      setEditingId(null);
      
      await fetchTransactions();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleEdit = (tx) => {
    setEditingId(tx._id);
    setTitle(tx.title);
    setAmount(tx.amount.toString());
    setType(tx.type);
    setCategory(tx.category);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      await fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const totals = transactions.reduce(
    (acc, tx) => {
      if (tx.type === 'income') acc.balance += tx.amount;
      else acc.balance -= tx.amount;
      return acc;
    },
    { balance: 0 }
  );

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex h-screen bg-[#f5f6fa] text-gray-800">

      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="flex justify-between items-center p-6 border-b bg-white">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg bg-gray-100">
              <ChevronLeft size={18} />
            </button>
            <span className="font-semibold">{currentMonth} 2026</span>
            <button className="p-2 rounded-lg bg-gray-100">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 bg-gray-100 rounded-lg">
              <Search size={18} />
            </button>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm">
              <Filter size={14} />
              All accounts
            </div>
          </div>
        </header>

        <main className="p-6 overflow-y-auto flex-1">
          {activeSection === 'overview' && (
            <div className="space-y-6">
              {/* BALANCE */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#ADC698]">
                  ₹{totals.balance} Left to spend
                </h2>
              </div>

              {/* ADD */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="mb-4 font-semibold">
                  {editingId ? 'Edit Transaction' : 'Add Transaction'}
                </h3>

                <form onSubmit={handleAddTransaction}>
                  <div className="flex bg-gray-100 rounded-xl p-1 mb-3">
                    <button
                      type="button"
                      onClick={() => setType('expense')}
                      className={`flex-1 py-2 rounded ${
                        type === 'expense' ? 'bg-white shadow text-[#C05746]' : 'text-gray-500'
                      }`}
                    >
                      Expense
                    </button>

                    <button
                      type="button"
                      onClick={() => setType('income')}
                      className={`flex-1 py-2 rounded ${
                        type === 'income' ? 'bg-white shadow text-[#ADC698]' : 'text-gray-500'
                      }`}
                    >
                      Income
                    </button>
                  </div>

                  <input
                    placeholder="Title"
                    className="w-full p-3 border border-gray-200 rounded-xl mb-3 focus:border-[#C05746] outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                  <div className="flex gap-2 mb-3">
                    <input
                      type="number"
                      placeholder="Amount"
                      step="0.01"
                      className="flex-1 p-3 border border-gray-200 rounded-xl focus:border-[#C05746] outline-none"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />

                    <select
                      className="p-3 border border-gray-200 rounded-xl"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {Object.keys(CATEGORIES).map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-[#C05746] hover:bg-[#a04638] text-white py-3 rounded-xl font-semibold"
                    >
                      {editingId ? 'Update' : '+ Add'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setTitle('');
                          setAmount('');
                          setType('expense');
                          setCategory('Food');
                        }}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* LIST */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="mb-4 font-semibold">Recent Transactions</h3>

                {transactions.length === 0 ? (
                  <p className="text-gray-400">No transactions yet</p>
                ) : (
                  <div className="space-y-2">
                    {transactions
                      .slice()
                      .reverse()
                      .map((tx) => (
                        <div key={tx._id} className="flex justify-between items-center p-3 border-b last:border-none hover:bg-gray-50">
                          <div className="flex-1">
                            <p className="font-medium">{tx.title}</p>
                            <p className="text-xs text-gray-500">{tx.category}</p>
                          </div>
                          <span className={`font-semibold ${tx.type === 'income' ? 'text-[#ADC698]' : 'text-[#C05746]'}`}>
                            {tx.type === 'income' ? '+' : '-'}₹{tx.amount}
                          </span>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleEdit(tx)}
                              className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(tx._id)}
                              className="text-sm px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === 'expenses' && (
            <div className="text-xl font-semibold">Expense Section (build later)</div>
          )}

          {activeSection === 'income' && (
            <div className="text-xl font-semibold">Income Section (build later)</div>
          )}

          {activeSection === 'reports' && (
            <div className="text-xl font-semibold">Reports Section</div>
          )}
        </main>
      </div>
    </div>
  );
}