import { CreditCard, TrendingDown, AlertTriangle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { debts } from '../data/mockData';

export function Debt() {
  const totalDebt = debts.reduce((sum, d) => sum + d.total, 0);
  const totalPaid = debts.reduce((sum, d) => sum + d.paid, 0);
  const totalRemaining = totalDebt - totalPaid;
  const overallProgress = (totalPaid / totalDebt) * 100;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Debt Management</h1>
        <p className="text-gray-600 mt-1">
          Track and manage your debt repayment journey
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-red-500 to-orange-600 text-white border-0">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 opacity-90" />
            <div className="text-sm opacity-90">Total Debt</div>
          </div>
          <div className="text-3xl font-semibold">
            ${totalDebt.toLocaleString()}
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Total Paid</div>
          <div className="text-3xl font-semibold text-gray-900">
            ${totalPaid.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <TrendingDown className="w-3 h-3" />
            <span>Keep going!</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Remaining</div>
          <div className="text-3xl font-semibold text-gray-900">
            ${totalRemaining.toLocaleString()}
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Overall Progress</div>
          <div className="text-3xl font-semibold text-gray-900">
            {overallProgress.toFixed(0)}%
          </div>
          <Progress value={overallProgress} className="h-1.5 mt-2" />
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="p-6">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Overall Debt Repayment</h3>
          <span className="text-xl font-semibold">
            {overallProgress.toFixed(1)}%
          </span>
        </div>
        <Progress value={overallProgress} className="h-4" />
      </Card>

      {/* Individual Debts */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Debts</h2>
        <div className="space-y-4">
          {debts.map((debt) => {
            const percentage = (debt.paid / debt.total) * 100;
            const remaining = debt.total - debt.paid;

            return (
              <Card key={debt.id} className="p-6">
                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{debt.name}</h3>
                    <p className="text-sm text-gray-500">
                      {debt.type} • {debt.interestRate}% APR
                    </p>
                  </div>
                  <span className="font-semibold">
                    {percentage.toFixed(0)}%
                  </span>
                </div>

                <Progress value={percentage} className="h-2" />

                <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                  <div>
                    <p>Total</p>
                    <p className="font-semibold">${debt.total}</p>
                  </div>
                  <div>
                    <p>Paid</p>
                    <p className="font-semibold text-green-600">
                      ${debt.paid}
                    </p>
                  </div>
                  <div>
                    <p>Remaining</p>
                    <p className="font-semibold text-red-600">
                      ${remaining}
                    </p>
                  </div>
                </div>

                {debt.interestRate > 15 && (
                  <div className="mt-3 text-orange-600 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    High interest – prioritize this
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Strategy */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Payoff Strategy</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Avalanche */}
          <div>
            <h4 className="font-semibold mb-2">Avalanche</h4>
            <ol className="space-y-1 text-sm">
              {[...debts]
                .sort((a, b) => b.interestRate - a.interestRate)
                .map((d, i) => (
                  <li key={d.id}>
                    {i + 1}. {d.name} ({d.interestRate}%)
                  </li>
                ))}
            </ol>
          </div>

          {/* Snowball */}
          <div>
            <h4 className="font-semibold mb-2">Snowball</h4>
            <ol className="space-y-1 text-sm">
              {[...debts]
                .sort((a, b) => (a.total - a.paid) - (b.total - b.paid))
                .map((d, i) => (
                  <li key={d.id}>
                    {i + 1}. {d.name}
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </Card>
    </div>
  );
}