import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Filter, Download, Plus } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { transactions } from '../data/mockData';

export function Transactions() {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredTransactions = transactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (filterCategory !== 'all' && t.category !== filterCategory) return false;
    return true;
  });

  const categories = Array.from(new Set(transactions.map(t => t.category)));

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        <p className="text-gray-600 mt-1">View and manage all your transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-sm text-gray-600">Total Income</div>
          </div>
          <div className="text-3xl font-semibold text-gray-900">
            ${transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
          </div>
          <div className="text-sm text-green-600 mt-2">+12.5% from last month</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-sm text-gray-600">Total Expenses</div>
          </div>
          <div className="text-3xl font-semibold text-gray-900">
            ${Math.abs(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)).toLocaleString()}
          </div>
          <div className="text-sm text-red-600 mt-2">-8.3% from last month</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-sm text-gray-600">Net Balance</div>
          </div>
          <div className="text-3xl font-semibold text-gray-900">
            ${(transactions.reduce((sum, t) => sum + t.amount, 0)).toLocaleString()}
          </div>
          <div className="text-sm text-blue-600 mt-2">+24.7% from last month</div>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input placeholder="Search transactions..." />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>

          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>

          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Transaction
          </Button>
        </div>
      </Card>

      {/* Transactions List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50'
                      }`}>
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div className="font-medium text-gray-900">{transaction.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      transaction.type === 'income' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {transaction.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
