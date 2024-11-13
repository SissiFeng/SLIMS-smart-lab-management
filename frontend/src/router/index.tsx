import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Analytics from '../pages/Analytics';
import UsageAnalysis from '../pages/Analytics/Usage';
import CellStatistics from '../pages/Analytics/CellStats';
import Reports from '../pages/Analytics/Reports';
import InventoryList from '../pages/Inventory/List';
import StockIn from '../pages/Inventory/StockIn';
import StockOut from '../pages/Inventory/StockOut';
import Antibodies from '../pages/Inventory/Antibodies';
import CellLines from '../pages/Inventory/CellLines';
import Plasmids from '../pages/Inventory/Plasmids';
import Primers from '../pages/Inventory/Primers';
import Enzymes from '../pages/Inventory/Enzymes';
import Media from '../pages/Inventory/Media';
import Serum from '../pages/Inventory/Serum';
import CellCulture from '../pages/CellCulture';
import PassageRecords from '../pages/CellCulture/PassageRecords';
import Cryopreservation from '../pages/CellCulture/Cryo';
import ThawingRecords from '../pages/CellCulture/Thawing';
import Molecular from '../pages/Molecular';
import PlasmidMaps from '../pages/Molecular/PlasmidMaps';
import PrimerDesign from '../pages/Molecular/PrimerDesign';
import CloningRecords from '../pages/Molecular/Cloning';
import SafetyMonitor from '../pages/Safety/Monitor';
import BSLManagement from '../pages/Safety/BSL';
import AlertManagement from '../pages/Safety/Alerts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
        children: [
          {
            path: '',
            element: <UsageAnalysis />,
          },
          {
            path: 'usage',
            element: <UsageAnalysis />,
          },
          {
            path: 'cell-stats',
            element: <CellStatistics />,
          },
          {
            path: 'reports',
            element: <Reports />,
          },
        ],
      },
      {
        path: 'inventory',
        children: [
          {
            path: 'list',
            element: <InventoryList />,
          },
          {
            path: 'in',
            element: <StockIn />,
          },
          {
            path: 'out',
            element: <StockOut />,
          },
          {
            path: 'antibodies',
            element: <Antibodies />,
          },
          {
            path: 'cell-lines',
            element: <CellLines />,
          },
          {
            path: 'plasmids',
            element: <Plasmids />,
          },
          {
            path: 'primers',
            element: <Primers />,
          },
          {
            path: 'enzymes',
            element: <Enzymes />,
          },
          {
            path: 'media',
            element: <Media />,
          },
          {
            path: 'serum',
            element: <Serum />,
          },
        ],
      },
      {
        path: 'cell-culture',
        element: <CellCulture />,
        children: [
          {
            path: '',
            element: <PassageRecords />,
          },
          {
            path: 'passage',
            element: <PassageRecords />,
          },
          {
            path: 'cryo',
            element: <Cryopreservation />,
          },
          {
            path: 'thawing',
            element: <ThawingRecords />,
          },
        ],
      },
      {
        path: 'molecular',
        element: <Molecular />,
        children: [
          {
            path: '',
            element: <PlasmidMaps />,
          },
          {
            path: 'plasmid-maps',
            element: <PlasmidMaps />,
          },
          {
            path: 'primer-design',
            element: <PrimerDesign />,
          },
          {
            path: 'cloning',
            element: <CloningRecords />,
          },
        ],
      },
      {
        path: 'safety',
        children: [
          {
            path: 'monitor',
            element: <SafetyMonitor />,
          },
          {
            path: 'bsl',
            element: <BSLManagement />,
          },
          {
            path: 'alerts',
            element: <AlertManagement />,
          },
        ],
      },
    ],
  },
]);

export default router; 