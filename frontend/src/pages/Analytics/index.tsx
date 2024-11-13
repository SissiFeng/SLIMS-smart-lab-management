// frontend/src/pages/Analytics/index.tsx
import React from 'react';
import { Tabs } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { LineChartOutlined, BarChartOutlined, FileTextOutlined } from '@ant-design/icons';
import './index.scss';

const Analytics: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 从路径中获取当前活动的标签
  const getActiveKey = () => {
    const path = location.pathname.split('/');
    return path[path.length - 1] || 'usage';
  };

  const items = [
    {
      key: 'usage',
      label: (
        <span>
          <LineChartOutlined />
          Usage Analysis
        </span>
      ),
    },
    {
      key: 'cell-stats',
      label: (
        <span>
          <BarChartOutlined />
          Cell Statistics
        </span>
      ),
    },
    {
      key: 'reports',
      label: (
        <span>
          <FileTextOutlined />
          Reports
        </span>
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    navigate(`/analytics/${key}`);
  };

  return (
    <div className="analytics-container">
      <Tabs 
        activeKey={getActiveKey()}
        items={items}
        onChange={handleTabChange}
        className="analytics-tabs"
      />
      <div className="analytics-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Analytics;