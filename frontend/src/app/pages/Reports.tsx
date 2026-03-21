import { TrendingUp, DollarSign, PieChart as PieChartIcon } from 'lucide-react';
import { Card } from '../components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { monthlyData, spendingByCategory, budgets, calculateSummary } from '../data/mockData';

export function Reports() {
  const summary = calculateSummary();

  const savingsRate = ((summary.monthlyIncome - summary.monthlySpending) / summary.monthlyIncome) * 100;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Reports & Insights</h1>
        <p className="text-gray-600 mt-1">Detailed analytics and financial insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 opacity-90" />
            <div className="text-sm opacity-90">Savings Rate</div>
          </div>
          <div className="text-3xl font-semibold">{savingsRate.toFixed(1)}%</div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Avg Monthly Income</div>
          <div className="text-3xl font-semibold text-gray-900">
            ${(monthlyData.reduce((sum, m) => sum + m.income, 0) / monthlyData.length).toLocaleString()}
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Avg Monthly Expenses</div>
          <div className="text-3xl font-semibold text-gray-900">
            ${(monthlyData.reduce((sum, m) => sum + m.expenses, 0) / monthlyData.length).toLocaleString()}
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Net Cashflow</div>
          <div className="text-3xl font-semibold text-green-600">
            ${(summary.monthlyIncome - summary.monthlySpending).toLocaleString()}
          </div>
        </Card>
      </div>

      {/* Income vs Expenses Trend */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-gray-900">Income vs Expenses Trend</h3>
            <p className="text-sm text-gray-600 mt-1">6-month financial overview</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
            <Area type="monotone" dataKey="income" stroke="#10b981" fillOpacity={1} fill="url(#colorIncome)" name="Income" />
            <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpenses)" name="Expenses" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Spending Breakdown & Category Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category Pie Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Spending Distribution</h3>
              <p className="text-sm text-gray-600 mt-1">Category breakdown</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={spendingByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {spendingByCategory.map((entry, index) => (
                  <Cell key={`reports-pie-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: any) => `$${value.toFixed(2)}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Details */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Category Analysis</h3>
              <p className="text-sm text-gray-600 mt-1">Detailed spending breakdown</p>
            </div>
          </div>
          <div className="space-y-4">
            {spendingByCategory
              .sort((a, b) => b.value - a.value)
              .map((category, index) => {
                const total = spendingByCategory.reduce((sum, c) => sum + c.value, 0);
                const percentage = (category.value / total) * 100;

                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-sm font-medium text-gray-900">{category.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          ${category.value.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: category.color
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 w-12 text-right">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>
      </div>

      {/* Budget Performance */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-gray-900">Budget Performance</h3>
            <p className="text-sm text-gray-600 mt-1">How you're tracking against your budgets</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={budgets}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: any) => `$${value.toFixed(2)}`}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="limit" fill="#e5e7eb" radius={[8, 8, 0, 0]} name="Budget Limit" />
            <Bar dataKey="spent" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Spent" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Top Insight</div>
              <div className="font-semibold text-gray-900">Excellent Savings</div>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Your savings rate of {savingsRate.toFixed(1)}% is above the recommended 20%. 
            You're building a strong financial foundation!
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center">
              <PieChartIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Spending Alert</div>
              <div className="font-semibold text-gray-900">Watch Shopping</div>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            You've used 80% of your Shopping budget. Consider reducing discretionary purchases 
            for the rest of the month.
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Goal Progress</div>
              <div className="font-semibold text-gray-900">On Track</div>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            You're on track to reach your "New Laptop" goal by the deadline. 
            Keep up the consistent contributions!
          </p>
        </Card>
      </div>

      {/* Monthly Comparison */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-gray-900">Monthly Comparison</h3>
            <p className="text-sm text-gray-600 mt-1">Compare your financial metrics month over month</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4">This Month vs Last Month</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                <span className="text-sm text-gray-700">Income</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">$5,850</span>
                  <span className="text-xs text-green-600 font-medium">+8.3%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                <span className="text-sm text-gray-700">Expenses</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">$3,200</span>
                  <span className="text-xs text-green-600 font-medium">-21.9%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                <span className="text-sm text-gray-700">Savings</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">$2,650</span>
                  <span className="text-xs text-green-600 font-medium">+104.6%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4">Financial Health Score</h4>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#10b981"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.85)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">85</div>
                    <div className="text-xs text-gray-600">Excellent</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Savings Rate</span>
                <span className="text-green-600 font-medium">Excellent</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Debt Management</span>
                <span className="text-green-600 font-medium">Good</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Budget Adherence</span>
                <span className="text-amber-600 font-medium">Fair</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}