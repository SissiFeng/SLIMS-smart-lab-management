// src/pages/Safety/Alerts/index.tsx
import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, Button, message, Space } from 'antd';
import { WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './index.scss';

interface SafetyAlert {
  id: string;
  type: 'compatibility' | 'environment' | 'expiry';
  status: 'warning' | 'critical';
  details: string;
  chemical?: {
    id: string;
    name: string;
  };
  location?: string;
  timestamp: string;
}

const AlertManagement: React.FC = () => {
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      setAlerts([
        {
          id: '1',
          type: 'environment',
          status: 'warning',
          details: 'Temperature exceeds normal range in Zone A',
          location: 'Zone A',
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'expiry',
          status: 'critical',
          details: 'Chemical expires in 7 days',
          chemical: {
            id: 'chem-1',
            name: 'Hydrochloric Acid'
          },
          timestamp: new Date().toISOString(),
        },
        {
          id: '3',
          type: 'compatibility',
          status: 'warning',
          details: 'Incompatible chemicals stored nearby',
          chemical: {
            id: 'chem-2',
            name: 'Sodium Hydroxide'
          },
          location: 'Zone B',
          timestamp: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAcknowledge = (alertId: string) => {
    message.success('Alert acknowledged successfully');
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap = {
          environment: 'Environment',
          expiry: 'Expiry',
          compatibility: 'Compatibility'
        };
        return typeMap[type as keyof typeof typeMap];
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'warning' ? 'warning' : 'error'} icon={<WarningOutlined />}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Location/Chemical',
      key: 'location',
      render: (_: any, record: SafetyAlert) => (
        <span>{record.chemical?.name || record.location}</span>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => new Date(timestamp).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: SafetyAlert) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handleAcknowledge(record.id)}
            icon={<CheckCircleOutlined />}
          >
            Acknowledge
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="main-content-wrapper">
      <div className="alert-management">
        <Card 
          title="Safety Alerts" 
          extra={
            <Tag color="error">
              {alerts.length} Active Alerts
            </Tag>
          }
        >
          <Table
            dataSource={alerts}
            columns={columns}
            loading={loading}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    </div>
  );
};

export default AlertManagement;