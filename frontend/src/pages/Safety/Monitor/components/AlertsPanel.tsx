import React from 'react';
import { Card, List, Tag, Button, Space } from 'antd';
import { WarningOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface Alert {
  id: string;
  type: 'environment' | 'chemical' | 'equipment';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  location: string;
}

const AlertsPanel: React.FC = () => {
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'environment',
      severity: 'high',
      message: 'High temperature in Storage Room A',
      timestamp: '2024-03-10T10:30:00Z',
      location: 'Storage Room A',
    },
    {
      id: '2',
      type: 'chemical',
      severity: 'medium',
      message: 'Chemical storage condition warning: Humidity above threshold',
      timestamp: '2024-03-10T10:25:00Z',
      location: 'Cabinet B-2',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card 
      title={
        <Space>
          <WarningOutlined style={{ color: '#ff4d4f' }} />
          <span>Active Alerts</span>
        </Space>
      }
      extra={
        <Button type="primary" size="small">
          View All
        </Button>
      }
    >
      <List
        dataSource={alerts}
        renderItem={item => (
          <List.Item
            extra={
              <Space>
                <ClockCircleOutlined />
                {new Date(item.timestamp).toLocaleTimeString()}
              </Space>
            }
          >
            <List.Item.Meta
              title={
                <Space>
                  <Tag color={getSeverityColor(item.severity)}>
                    {item.severity.toUpperCase()}
                  </Tag>
                  {item.message}
                </Space>
              }
              description={`Location: ${item.location}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default AlertsPanel; 