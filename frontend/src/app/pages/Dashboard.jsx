import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Wallet, PiggyBank, Plus, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { calculateSummary, goals, bills, debts, budgets, monthlyData, spendingByCategory, transactions } from '../data/mockData';

export function Dashboard() {
  const summary = calculateSummary();

  return (
    <div className="p-8 space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back, Sarah</h1>
        <p className="text-gray-600 mt-1">Here's your financial overview for March 2026</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center justify-between mb-3">
            <PiggyBank className="w-8 h-8 opacity-90" />
            <div className="text-xs bg-white/20 px-2 py-1 rounded-full">+12%</div>
          </div>
          <div className="text-sm opacity-90 mb-1">Total Saved</div>
          <div className="text-3xl font-semibold">${summary.totalSaved.toLocaleString()}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">+8%</div>
          </div>
          <div className="text-sm text-gray-600 mb-1">Net Worth</div>
          <div className="text-3xl font-semibold text-gray-900">${summary.netWorth.toLocaleString()}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <ArrowDownRight className="w-8 h-8 text-red-600" />
          </div>
          <div className="text-sm text-gray-600 mb-1">Monthly Spending</div>
          <div className="text-3xl font-semibold text-gray-900">${summary.monthlySpending.toLocaleString()}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <ArrowUpRight className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-sm text-gray-600 mb-1">Monthly Income</div>
          <div className="text-3xl font-semibold text-gray-900">${summary.monthlyIncome.toLocaleString()}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Wallet className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-sm text-gray-600 mb-1">Budget Remaining</div>
          <div className="text-3xl font-semibold text-gray-900">${summary.budgetRemaining.toLocaleString()}</div>
        </Card>
      </div>

      {/* Financial Overview & Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Money In vs Money Out */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Money In vs Money Out</h3>
              <p className="text-sm text-gray-600 mt-1">Last 6 months comparison</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  fontSize: '12px'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} name="Income" />
              <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Budget Usage */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Budget Usage</h3>
              <p className="text-sm text-gray-600 mt-1">Category-wise breakdown</p>
            </div>
          </div>
          <div className="space-y-4">
            {budgets.slice(0, 5).map((budget) => {
              const percentage = (budget.spent / budget.limit) * 100;
              const isOverBudget = percentage > 100;
              
              return (
                <div key={budget.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{budget.category}</span>
                    <span className="text-sm text-gray-600">
                      ${budget.spent.toFixed(2)} / ${budget.limit}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className="flex-1 h-2"
                      style={{ 
                        backgroundColor: '#f3f4f6',
                      }}
                    />
                    <span className={`text-sm font-medium w-12 text-right ${
                      isOverBudget ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Goals & Spending Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Savings Goals */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Savings Goals</h3>
              <p className="text-sm text-gray-600 mt-1">Track your progress</p>
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Goal
            </Button>
          </div>
          <div className="space-y-4">
            {goals.map((goal) => {
              const percentage = (goal.current / goal.target) * 100;
              
              return (
                <div key={goal.id} className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{goal.name}</h4>
                      <p className="text-xs text-gray-600 mt-1">Due: {new Date(goal.deadline).toLocaleDateString()}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{percentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={percentage} className="h-2 mb-2" style={{ backgroundColor: '#f3f4f6' }} />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">${goal.current.toLocaleString()}</span>
                    <span className="text-gray-900 font-medium">of ${goal.target.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Spending Breakdown */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Spending Breakdown</h3>
              <p className="text-sm text-gray-600 mt-1">Current month categories</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={spendingByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {spendingByCategory.map((entry, index) => (
                  <Cell key={`dashboard-pie-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  fontSize: '12px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bills & Debt */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Bills */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Upcoming Bills</h3>
              <p className="text-sm text-gray-600 mt-1">Next 30 days</p>
            </div>
          </div>
          <div className="space-y-3">
            {bills.filter(b => !b.isPaid).slice(0, 5).map((bill) => (
              <div key={bill.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{bill.name}</div>
                    <div className="text-sm text-gray-600">Due: {new Date(bill.dueDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${bill.amount.toFixed(2)}</div>
                  <div className="text-xs text-gray-600">{bill.category}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Debt Tracker */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Debt Tracker</h3>
              <p className="text-sm text-gray-600 mt-1">Total remaining: ${summary.totalDebt.toLocaleString()}</p>
            </div>
          </div>
          <div className="space-y-4">
            {debts.map((debt) => {
              const percentage = (debt.paid / debt.total) * 100;
              const remaining = debt.total - debt.paid;
              
              return (
                <div key={debt.id} className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{debt.name}</h4>
                      <p className="text-xs text-gray-600 mt-1">{debt.type} • {debt.interestRate}% APR</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{percentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={percentage} className="h-2 mb-2" style={{ backgroundColor: '#f3f4f6' }} />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">${remaining.toLocaleString()} remaining</span>
                    <span className="text-gray-900 font-medium">${debt.total.toLocaleString()} total</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recent Transactions & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
              <p className="text-sm text-gray-600 mt-1">Last 5 transactions</p>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'income' 
                      ? 'bg-green-50' 
                      : 'bg-red-50'
                  }`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{transaction.description}</div>
                    <div className="text-sm text-gray-600">{transaction.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600">{new Date(transaction.date).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Smart Insights</h3>
              <p className="text-sm text-gray-600 mt-1">Powered by AI</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Great Savings!</h4>
                  <p className="text-sm text-blue-700">You're saving 28% more this month compared to last month. Keep it up!</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900 mb-1">Budget Alert</h4>
                  <p className="text-sm text-amber-700">You've spent 80% of your Shopping budget. Consider slowing down.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 mb-1">Goal Achievement</h4>
                  <p className="text-sm text-green-700">You're on track to reach your "New Laptop" goal by June 1st!</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900 mb-1">Bill Reminder</h4>
                  <p className="text-sm text-purple-700">Your Netflix subscription ($15.99) is due in 2 days.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
