// src/components/layout/MainLayout.tsx
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.scss';

const MainLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <Sidebar />
        <Layout.Content style={{ padding: '24px', background: '#f5f5f5' }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;