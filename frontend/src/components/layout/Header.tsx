// src/components/layout/Header.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import './Layout.scss';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: 'inventory',
      label: 'Inventory'
    },
    {
      key: 'safety',
      label: 'Safety'
    },
    {
      key: 'analytics',
      label: 'Analytics'
    }
  ];

  return (
    <AntHeader className="app-header">
      <div className="logo">SLIMS</div>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname.split('/')[1] || 'inventory']}
        items={menuItems}
        onClick={({ key }) => navigate(`/${key}`)}
        className="header-menu"
        style={{ flex: 1, minWidth: '1000px', justifyContent: 'center' }}
      />
    </AntHeader>
  );
};

export default Header;