// src/pages/Safety/Monitor/index.tsx
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Space, Alert, Button } from 'antd';
import { WarningOutlined, AlertOutlined, SoundOutlined } from '@ant-design/icons';
import EnvironmentMonitor from './components/EnvironmentMonitor';
import ChemicalHazards from './components/ChemicalHazards';
import AlertsPanel from './components/AlertsPanel';
import './index.scss';

interface EnvironmentData {
  id: string;
  zone: string;
  temperature: number;
  humidity: number;
  pressure: number;
  co2_level?: number;
  o2_level?: number;
  last_checked: string;
  status: 'normal' | 'warning' | 'critical';
}

interface ChemicalAlert {
  id: string;
  chemical: string;
  hazard_type: string;
  location: string;
  status: 'active' | 'resolved';
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

const SafetyMonitor: React.FC = () => {
  const [activeAlerts, setActiveAlerts] = useState<number>(0);
  const [environmentStatus, setEnvironmentStatus] = useState<'normal' | 'warning' | 'critical'>('normal');
  const [loading, setLoading] = useState(true);

  // 模拟实时数据更新
  useEffect(() => {
    const timer = setInterval(() => {
      // 这里应该是实际的API调用
      updateEnvironmentData();
    }, 30000); // 每30秒更新一次

    return () => clearInterval(timer);
  }, []);

  const updateEnvironmentData = () => {
    // 模拟API调用
    // 实际项目中应该连接到实时监控系统
  };

  return (
    <div className="safety-monitor-page">
      {activeAlerts > 0 && (
        <Alert
          message={`${activeAlerts} Active Alerts`}
          type="warning"
          showIcon
          icon={<SoundOutlined />}
          action={
            <Button size="small" danger>
              View Alerts
            </Button>
          }
          className="alerts-banner"
        />
      )}

      <Row gutter={[24, 24]}>
        <Col span={16}>
          <EnvironmentMonitor />
        </Col>
        <Col span={8}>
          <ChemicalHazards />
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <AlertsPanel />
        </Col>
      </Row>
    </div>
  );
};

export default SafetyMonitor;