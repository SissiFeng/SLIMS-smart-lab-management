// src/pages/Dashboard/index.tsx
import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { 
  ExperimentOutlined, 
  AlertOutlined, 
  ClockCircleOutlined,
  ThunderboltOutlined 
} from '@ant-design/icons';
import DashboardCard from '../../components/common/DashboardCard';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <DashboardCard
            title="Cell Lines"
            value={42}
            prefix={<ExperimentOutlined />}
            suffix="active"
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            title="Expiring Media"
            value={5}
            prefix={<AlertOutlined />}
            suffix="items"
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            title="Pending Passages"
            value={8}
            prefix={<ClockCircleOutlined />}
            suffix="lines"
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            title="Critical Alerts"
            value={3}
            prefix={<ThunderboltOutlined />}
            suffix="active"
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col span={12}>
          <Card title="Temperature Monitoring">
            {/* 这里可以添加温度监控图表 */}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Recent Activities">
            {/* 这里可以添加最近活动列表 */}
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col span={8}>
          <Card title="BSL Status">
            {/* 生物安全等级状态 */}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Cell Culture Status">
            {/* 细胞培养状态 */}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Storage Conditions">
            {/* 存储条件监控 */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;