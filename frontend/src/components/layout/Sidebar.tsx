// src/components/layout/Sidebar.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  ExperimentOutlined,
  SafetyCertificateOutlined,
  BarChartOutlined,
  SettingOutlined,
  TeamOutlined,
  DatabaseOutlined,
  SearchOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard'
    },
    {
      key: 'inventory',
      icon: <DatabaseOutlined />,
      label: 'Inventory',
      children: [
        {
          key: 'inventory/antibodies',
          label: 'Antibodies'
        },
        {
          key: 'inventory/cell-lines',
          label: 'Cell Lines'
        },
        {
          key: 'inventory/plasmids',
          label: 'Plasmids'
        },
        {
          key: 'inventory/primers',
          label: 'Primers'
        },
        {
          key: 'inventory/enzymes',
          label: 'Enzymes'
        },
        {
          key: 'inventory/media',
          label: 'Culture Media'
        },
        {
          key: 'inventory/serum',
          label: 'Serum'
        }
      ]
    },
    {
      key: 'cell-culture',
      icon: <ExperimentOutlined />,
      label: 'Cell Culture',
      children: [
        {
          key: 'cell-culture/passage',
          label: 'Passage Records'
        },
        {
          key: 'cell-culture/cryo',
          label: 'Cryopreservation'
        },
        {
          key: 'cell-culture/thawing',
          label: 'Thawing Records'
        }
      ]
    },
    {
      key: 'molecular',
      icon: <SearchOutlined />,
      label: 'Molecular Biology',
      children: [
        {
          key: 'molecular/plasmid-maps',
          label: 'Plasmid Maps'
        },
        {
          key: 'molecular/primer-design',
          label: 'Primer Design'
        },
        {
          key: 'molecular/cloning',
          label: 'Cloning Records'
        }
      ]
    },
    {
      key: 'safety',
      icon: <SafetyCertificateOutlined />,
      label: 'Safety',
      children: [
        {
          key: 'safety/monitor',
          label: 'Safety Monitor'
        },
        {
          key: 'safety/bsl',
          label: 'BSL Management'
        },
        {
          key: 'safety/alerts',
          label: 'Alert Management'
        }
      ]
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics',
      children: [
        {
          key: 'analytics/usage',
          label: 'Usage Analysis'
        },
        {
          key: 'analytics/cell-stats',
          label: 'Cell Statistics'
        },
        {
          key: 'analytics/reports',
          label: 'Reports'
        }
      ]
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings'
    },
    {
      key: 'users',
      icon: <TeamOutlined />,
      label: 'Users'
    }
  ];

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentMainPath = pathSegments[0] || 'dashboard';
  const currentSubPath = pathSegments.length > 1 ? `${pathSegments[0]}/${pathSegments[1]}` : currentMainPath;

  return (
    <Sider
      width={220}
      className="app-sider"
      style={{
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        zIndex: 1000,
        background: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="logo">BLIMS</div>
      <Menu
        mode="inline"
        selectedKeys={[currentSubPath]}
        defaultOpenKeys={['inventory', 'cell-culture', 'molecular', 'safety', 'analytics']}
        items={menuItems}
        onClick={({ key }) => navigate(`/${key}`)}
        style={{
          border: 'none',
          background: 'transparent'
        }}
      />
    </Sider>
  );
};

export default Sidebar;