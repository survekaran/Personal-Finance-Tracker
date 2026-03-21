import { CreditCard, TrendingDown, AlertTriangle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { debts } from '../data/mockData';

export function Debt() {
  const totalDebt = debts.reduce((sum, d) => sum + d.total, 0);
  const totalPaid = debts.reduce((sum, d) => sum + d.paid, 0);
  const totalRemaining = debts.reduce((sum, d) => sum + (d.total - d.paid), 0);
  const overallProgress = (totalPaid / totalDebt) * 100;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Debt Management</h1>
        <p className="text-gray-600 mt-1">Track and manage your debt repayment journey</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-red-500 to-orange-600 text-white border-0">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 opacity-90" />
            <div className="text-sm opacity-90">Total Debt</div>
          </div>
          <div className="text-3xl font-semibold">${totalDebt.toLocaleString()}</div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Total Paid</div>
          <div className="text-3xl font-semibold text-gray-900">${totalPaid.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <TrendingDown className="w-3 h-3" />
            <span>Keep going!</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Remaining</div>
          <div className="text-3xl font-semibold text-gray-900">${totalRemaining.toLocaleString()}</div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Overall Progress</div>
          <div className="text-3xl font-semibold text-gray-900">{overallProgress.toFixed(0)}%</div>
          <Progress value={overallProgress} className="h-1.5 mt-2" />
        </Card>
      </div>

      {/* Overall Debt Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">Overall Debt Repayment</h3>
            <p className="text-sm text-gray-600 mt-1">Combined progress across all debts</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold text-gray-900">{overallProgress.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Paid Off</div>
          </div>
        </div>
        <Progress value={overallProgress} className="h-4" />
        <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
          <span>${totalPaid.toLocaleString()} paid</span>
          <span>${totalRemaining.toLocaleString()} remaining of ${totalDebt.toLocaleString()}</span>
        </div>
      </Card>

      {/* Individual Debts */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Debts</h2>
        <div className="space-y-4">
          {debts.map((debt) => {
            const percentage = (debt.paid / debt.total) * 100;
            const remaining = debt.total - debt.paid;
            const monthlyInterest = (remaining * (debt.interestRate / 100)) / 12;

            return (
              <Card key={debt.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{debt.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-600">{debt.type}</span>
                        <span className="text-sm text-orange-600 font-medium">
                          {debt.interestRate}% APR
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-gray-900">{percentage.toFixed(0)}%</div>
                    <div className="text-xs text-gray-600">Paid Off</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Progress 
                    value={percentage} 
                    className="h-3"
                    style={{ backgroundColor: '#f3f4f6' }}
                  />

                  <div className="grid grid-cols-4 gap-4 pt-3 border-t border-gray-200">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Total Debt</div>
                      <div className="font-semibold text-gray-900">${debt.total.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Paid</div>
                      <div className="font-semibold text-green-600">${debt.paid.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Remaining</div>
                      <div className="font-semibold text-red-600">${remaining.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Monthly Interest</div>
                      <div className="font-semibold text-orange-600">${monthlyInterest.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3">
                    <button className="flex-1 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                      View Details
                    </button>
                    <button className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 transition-colors text-sm font-medium text-white">
                      Make Payment
                    </button>
                  </div>
                </div>

                {debt.interestRate > 15 && (
                  <div className="mt-4 p-3 rounded-lg bg-orange-50 border border-orange-200">
                    <p className="text-sm text-orange-800 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>High interest rate - consider paying this off first!</span>
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Debt Payoff Strategies */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Recommended Payoff Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg border-2 border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">Avalanche Method</h4>
              <span className="px-2 py-1 rounded-full bg-blue-600 text-white text-xs">Recommended</span>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Pay off debts with the highest interest rates first to minimize total interest paid.
            </p>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">Suggested Order:</div>
              <ol className="space-y-2">
                {debts
                  .sort((a, b) => b.interestRate - a.interestRate)
                  .map((debt, index) => (
                    <li key={debt.id} className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{debt.name} ({debt.interestRate}% APR)</span>
                    </li>
                  ))}
              </ol>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-white border border-blue-200">
              <div className="text-sm font-medium text-gray-900 mb-1">Estimated Savings</div>
              <div className="text-2xl font-semibold text-blue-600">$3,247</div>
              <div className="text-xs text-gray-600">in interest over 3 years</div>
            </div>
          </div>

          <div className="p-5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">Snowball Method</h4>
              <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-xs">Alternative</span>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Pay off smallest debts first for quick wins and psychological motivation.
            </p>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">Suggested Order:</div>
              <ol className="space-y-2">
                {debts
                  .sort((a, b) => (a.total - a.paid) - (b.total - b.paid))
                  .map((debt, index) => (
                    <li key={debt.id} className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">
                        {debt.name} (${(debt.total - debt.paid).toLocaleString()} left)
                      </span>
                    </li>
                  ))}
              </ol>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-sm font-medium text-gray-900 mb-1">Psychological Benefit</div>
              <div className="text-2xl font-semibold text-gray-900">High</div>
              <div className="text-xs text-gray-600">Quick wins boost motivation</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Debt Management Tips */}
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <h3 className="font-semibold text-gray-900 mb-4">💡 Debt Management Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-white border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Pay More Than Minimum</h4>
            <p className="text-sm text-gray-600">
              Even small extra payments can significantly reduce interest and payoff time.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Consider Consolidation</h4>
            <p className="text-sm text-gray-600">
              Look into debt consolidation or balance transfer offers to lower interest rates.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Avoid New Debt</h4>
            <p className="text-sm text-gray-600">
              Focus on paying off existing debt before taking on new financial obligations.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
