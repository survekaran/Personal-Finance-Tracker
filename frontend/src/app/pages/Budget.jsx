import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { budgets } from '../data/mockData';

export function Budget() {
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const overallPercentage = (totalSpent / totalBudget) * 100;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Budget Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your monthly budget</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Set New Budget
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <div className="text-sm opacity-90 mb-2">Total Budget</div>
          <div className="text-3xl font-semibold mb-2">${totalBudget.toLocaleString()}</div>
          <div className="text-xs opacity-75">This month</div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Total Spent</div>
          <div className="text-3xl font-semibold text-gray-900 mb-2">${totalSpent.toFixed(2)}</div>
          <div className="flex items-center gap-1 text-xs text-red-600">
            <TrendingUp className="w-3 h-3" />
            <span>68% of budget</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Remaining</div>
          <div className="text-3xl font-semibold text-gray-900 mb-2">${totalRemaining.toFixed(2)}</div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <TrendingDown className="w-3 h-3" />
            <span>32% available</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Categories</div>
          <div className="text-3xl font-semibold text-gray-900 mb-2">{budgets.length}</div>
          <div className="text-xs text-gray-600">Active budgets</div>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">Overall Budget Progress</h3>
            <p className="text-sm text-gray-600 mt-1">March 2026</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold text-gray-900">{overallPercentage.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Used</div>
          </div>
        </div>
        <Progress value={overallPercentage} className="h-4" />
        <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
          <span>${totalSpent.toFixed(2)} spent</span>
          <span>${totalRemaining.toFixed(2)} remaining of ${totalBudget.toLocaleString()}</span>
        </div>
      </Card>

      {/* Category Budgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const remaining = budget.limit - budget.spent;
          const isOverBudget = percentage > 100;
          const isWarning = percentage > 80 && percentage <= 100;

          return (
            <Card key={budget.category} className={`p-6 ${
              isOverBudget ? 'border-red-200 bg-red-50' : 
              isWarning ? 'border-amber-200 bg-amber-50' : ''
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: budget.color }}
                    />
                    <h3 className="font-semibold text-gray-900">{budget.category}</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {isOverBudget ? 'Over budget' : 
                     isWarning ? 'Nearing limit' : 
                     'On track'}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-semibold ${
                    isOverBudget ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {percentage.toFixed(0)}%
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className="h-3"
                  style={{ backgroundColor: '#f3f4f6' }}
                />

                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Budget</div>
                    <div className="font-semibold text-gray-900">${budget.limit}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Spent</div>
                    <div className={`font-semibold ${
                      isOverBudget ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      ${budget.spent.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Remaining</div>
                    <div className={`font-semibold ${
                      remaining < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      ${Math.abs(remaining).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {isOverBudget && (
                <div className="mt-4 p-3 rounded-lg bg-red-100 border border-red-200">
                  <p className="text-sm text-red-800">
                    ⚠️ You've exceeded your budget by ${Math.abs(remaining).toFixed(2)}
                  </p>
                </div>
              )}

              {isWarning && !isOverBudget && (
                <div className="mt-4 p-3 rounded-lg bg-amber-100 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    ⚡ You have ${remaining.toFixed(2)} left for this category
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Budget Tips */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <h3 className="font-semibold text-gray-900 mb-4">💡 Budget Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-white border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Set Realistic Goals</h4>
            <p className="text-sm text-gray-600">
              Review your past spending to set achievable budget limits for each category.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Track Regularly</h4>
            <p className="text-sm text-gray-600">
              Check your budget progress weekly to stay on top of your spending habits.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Adjust as Needed</h4>
            <p className="text-sm text-gray-600">
              Don't be afraid to adjust your budgets based on changing needs and priorities.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
