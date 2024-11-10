// src/components/layout/Sidebar.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  AppstoreOutlined,
  SafetyCertificateOutlined,
  BarChartOutlined,
  SettingOutlined,
  TeamOutlined
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
      icon: <AppstoreOutlined />,
      label: 'Inventory',
      children: [
        {
          key: 'inventory/list',
          label: 'Inventory List'
        },
        {
          key: 'inventory/in',
          label: 'Stock In'
        },
        {
          key: 'inventory/out',
          label: 'Stock Out'
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
          key: 'analytics/reports',
          label: 'Reports'
        },
        {
          key: 'analytics/trends',
          label: 'Trend Analysis'
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

  return (
    <Sider width={220} className="app-sider">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname.split('/')[1] || 'dashboard']}
        defaultOpenKeys={['inventory', 'safety', 'analytics']}
        items={menuItems}
        onClick={({ key }) => navigate(`/${key}`)}
      />
    </Sider>
  );
};

export default Sidebar;