// src/routes/index.tsx
import { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';

// Inventory routes
import Antibodies from '../pages/Inventory/Antibodies';
import CellLines from '../pages/Inventory/CellLines';
import Plasmids from '../pages/Inventory/Plasmids';
import Primers from '../pages/Inventory/Primers';
import Enzymes from '../pages/Inventory/Enzymes';
import CultureMedia from '../pages/Inventory/Media';
import Serum from '../pages/Inventory/Serum';

// Cell Culture routes
import PassageRecords from '../pages/CellCulture/Passage';
import Cryopreservation from '../pages/CellCulture/Cryo';
import ThawingRecords from '../pages/CellCulture/Thawing';

// Molecular Biology routes
import PlasmidMaps from '../pages/Molecular/PlasmidMaps';
import PrimerDesign from '../pages/Molecular/PrimerDesign';
import CloningRecords from '../pages/Molecular/Cloning';

// Safety routes
import SafetyMonitor from '../pages/Safety/Monitor';
import BSLManagement from '../pages/Safety/BSL';
import AlertManagement from '../pages/Safety/Alerts';

// Analytics routes
import UsageAnalysis from '../pages/Analytics/Usage';
import CellStatistics from '../pages/Analytics/CellStats';
import Reports from '../pages/Analytics/Reports';

// Settings & Users
import Settings from '../pages/Settings';
import Users from '../pages/Users';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      // Inventory routes
      {
        path: 'inventory/antibodies',
        element: <Antibodies />
      },
      {
        path: 'inventory/cell-lines',
        element: <CellLines />
      },
      {
        path: 'inventory/plasmids',
        element: <Plasmids />
      },
      {
        path: 'inventory/primers',
        element: <Primers />
      },
      {
        path: 'inventory/enzymes',
        element: <Enzymes />
      },
      {
        path: 'inventory/media',
        element: <CultureMedia />
      },
      {
        path: 'inventory/serum',
        element: <Serum />
      },
      // Cell Culture routes
      {
        path: 'cell-culture/passage',
        element: <PassageRecords />
      },
      {
        path: 'cell-culture/cryo',
        element: <Cryopreservation />
      },
      {
        path: 'cell-culture/thawing',
        element: <ThawingRecords />
      },
      // Molecular Biology routes
      {
        path: 'molecular/plasmid-maps',
        element: <PlasmidMaps />
      },
      {
        path: 'molecular/primer-design',
        element: <PrimerDesign />
      },
      {
        path: 'molecular/cloning',
        element: <CloningRecords />
      },
      // Safety routes
      {
        path: 'safety/monitor',
        element: <SafetyMonitor />
      },
      {
        path: 'safety/bsl',
        element: <BSLManagement />
      },
      {
        path: 'safety/alerts',
        element: <AlertManagement />
      },
      // Analytics routes
      {
        path: 'analytics/usage',
        element: <UsageAnalysis />
      },
      {
        path: 'analytics/cell-stats',
        element: <CellStatistics />
      },
      {
        path: 'analytics/reports',
        element: <Reports />
      },
      // Settings & Users
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'users',
        element: <Users />
      }
    ]
  }
];

export default routes;