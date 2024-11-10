import React from 'react';
import { Card, List, Tag, Typography } from 'antd';
import { WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const SafetyStatus: React.FC = () => {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Hydrochloric Acid storage temperature high',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'success',
      message: 'All safety checks passed for Lab B',
      time: '3 hours ago'
    },
    {
      id: 3,
      type: 'warning',
      message: 'Low ventilation in Storage Room A',
      time: '5 hours ago'
    }
  ];

  return (
    <Card title="Safety Status">
      <List
        dataSource={alerts}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                item.type === 'warning' 
                  ? <WarningOutlined style={{ color: '#faad14' }} />
                  : <CheckCircleOutlined style={{ color: '#52c41a' }} />
              }
              title={item.message}
              description={item.time}
            />
            <Tag color={item.type === 'warning' ? 'warning' : 'success'}>
              {item.type.toUpperCase()}
            </Tag>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default SafetyStatus;
