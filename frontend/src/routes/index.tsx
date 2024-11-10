// src/routes/index.tsx
import { RouteObject } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import InventoryList from '../pages/Inventory/List';
import StockIn from '../pages/Inventory/StockIn';
import StockOut from '../pages/Inventory/StockOut';
import SafetyMonitor from '../pages/Safety/Monitor';
import AlertManagement from '../pages/Safety/Alerts';
import Reports from '../pages/Analytics/Reports';
import Trends from '../pages/Analytics/Trends';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        redirect: '/dashboard'
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'inventory/list',
        element: <InventoryList />
      },
      {
        path: 'inventory/in',
        element: <StockIn />
      },
      {
        path: 'inventory/out',
        element: <StockOut />
      },
      {
        path: 'safety/monitor',
        element: <SafetyMonitor />
      },
      {
        path: 'safety/alerts',
        element: <AlertManagement />
      },
      {
        path: 'analytics/reports',
        element: <Reports />
      },
      {
        path: 'analytics/trends',
        element: <Trends />
      }
    ]
  }
];
console.log('Routes:', routes); // 添加这行来调试
export default routes;