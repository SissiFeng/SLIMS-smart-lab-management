// src/pages/Dashboard/index.tsx
import React from 'react';
import { Row, Col, Card } from 'antd';
import { 
  DatabaseOutlined,
  WarningOutlined,
  SwapOutlined,
  ClockCircleOutlined 
} from '@ant-design/icons';
import DashboardCard from '../../components/common/DashboardCard';
import InventoryOverview from './components/InventoryOverview';
import SafetyStatus from './components/SafetyStatus';
import RecentActivities from './components/RecentActivities';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Row gutter={[24, 24]} style={{ width: '100%' }}>
        <Col xs={24} sm={12} lg={6}>
          <DashboardCard 
            title="Total Items"
            value={156}
            prefix={<DatabaseOutlined />}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <DashboardCard 
            title="Pending Alerts"
            value={3}
            prefix={<WarningOutlined />}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <DashboardCard 
            title="Today's Transactions"
            value={12}
            prefix={<SwapOutlined />}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <DashboardCard 
            title="Expiring Soon"
            value={5}
            prefix={<ClockCircleOutlined />}
          />
        </Col>
      </Row>
      
      <Row gutter={[24, 24]} style={{ marginTop: 24, width: '100%' }}>
        <Col xs={24} lg={16}>
          <InventoryOverview />
        </Col>
        <Col xs={24} lg={8}>
          <SafetyStatus />
        </Col>
      </Row>
      
      <Row style={{ marginTop: 24, width: '100%' }}>
        <Col span={24}>
          <RecentActivities />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;