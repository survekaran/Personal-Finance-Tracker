import { createBrowserRouter } from 'react-router';
import { Layout } from './layout/Layout.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Transactions } from './pages/Transactions.jsx';
import { Budget } from './pages/Budget.jsx';
import { Goals } from './pages/Goals.jsx';
import { Bills } from './pages/Bills.jsx';
import { Debt } from './pages/Debt.jsx';
import { Reports } from './pages/Reports.jsx';
import { Settings } from './pages/Settings.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'transactions', Component: Transactions },
      { path: 'budget', Component: Budget },
      { path: 'goals', Component: Goals },
      { path: 'bills', Component: Bills },
      { path: 'debt', Component: Debt },
      { path: 'reports', Component: Reports },
      { path: 'settings', Component: Settings },
    ],
  },
]);