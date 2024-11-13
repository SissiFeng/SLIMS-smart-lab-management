import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Space, Button } from 'antd';
import { SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import BSLFacilityStatus from './components/BSLFacilityStatus';
import AccessLogs from './components/AccessLogs';
import './index.scss';

const BSLManagement: React.FC = () => {
  return (
    <div className="bsl-management-page">
      <Row gutter={[24, 24]}>
        <Col span={16}>
          <BSLFacilityStatus />
        </Col>
        <Col span={8}>
          <Card title="Current Access">
            <Statistic 
              title="Personnel Inside" 
              value={3}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <AccessLogs />
        </Col>
      </Row>
    </div>
  );
};

export default BSLManagement; 