// src/components/layout/MainLayout.tsx
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.scss';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout className="app">  {/* 添加 app 类名 */}
      <Sidebar />
      <Layout style={{ marginLeft: 220 }}>
        <Content className="main-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;