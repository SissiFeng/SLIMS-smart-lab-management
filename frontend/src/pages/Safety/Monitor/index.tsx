// src/pages/Safety/Monitor/index.tsx
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tag } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import './index.scss';

interface SafetyStatus {
  environment: {
    locations: {
      id: string;
      zone: string;
      temperature: number;
      humidity: number;
      pressure: number;
      last_checked: string;
      status: 'normal' | 'warning';
    }[];
  };
  chemicals: {
    total: number;
    expired: number;
    expiring_soon: number;
    hazardous: number;
  };
}

const SafetyMonitor: React.FC = () => {
  const [safetyData, setSafetyData] = useState<SafetyStatus>({
    environment: {
      locations: []
    },
    chemicals: {
      total: 0,
      expired: 0,
      expiring_soon: 0,
      hazardous: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      setSafetyData({
        environment: {
          locations: [
            {
              id: '1',
              zone: 'Zone A',
              temperature: 22,
              humidity: 45,
              pressure: 1013,
              last_checked: new Date().toISOString(),
              status: 'normal'
            },
            {
              id: '2',
              zone: 'Zone B',
              temperature: 24,
              humidity: 55,
              pressure: 1012,
              last_checked: new Date().toISOString(),
              status: 'warning'
            }
          ]
        },
        chemicals: {
          total: 150,
          expired: 3,
          expiring_soon: 8,
          hazardous: 12
        }
      });
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      title: 'Zone',
      dataIndex: 'zone',
      key: 'zone',
    },
    {
      title: 'Temperature (°C)',
      dataIndex: 'temperature',
      key: 'temperature',
    },
    {
      title: 'Humidity (%)',
      dataIndex: 'humidity',
      key: 'humidity',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'normal' ? 'success' : 'warning'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div className="main-content-wrapper">
      <div className="safety-monitor">
        <Row gutter={[24, 24]}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Chemicals"
                value={safetyData.chemicals.total}
                loading={loading}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Expired Items"
                value={safetyData.chemicals.expired}
                valueStyle={{ color: '#cf1322' }}
                prefix={<WarningOutlined />}
                loading={loading}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Expiring Soon"
                value={safetyData.chemicals.expiring_soon}
                valueStyle={{ color: '#faad14' }}
                loading={loading}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Hazardous Items"
                value={safetyData.chemicals.hazardous}
                valueStyle={{ color: '#722ed1' }}
                loading={loading}
              />
            </Card>
          </Col>
        </Row>

        <Card title="Environment Monitoring" className="environment-card" style={{ marginTop: 24 }}>
          <Table
            dataSource={safetyData.environment.locations}
            columns={columns}
            loading={loading}
            rowKey="id"
          />
        </Card>
      </div>
    </div>
  );
};

export default SafetyMonitor;