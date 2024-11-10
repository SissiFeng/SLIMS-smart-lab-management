// frontend/src/pages/Dashboard/components/RecentActivities.tsx
import React from 'react';
import { Card, Timeline } from 'antd';
import { 
  ExperimentOutlined, 
  WarningOutlined, 
  CheckCircleOutlined 
} from '@ant-design/icons';

const RecentActivities: React.FC = () => {
  return (
    <Card title="Recent Activities" className="recent-activities">
      <Timeline>
        <Timeline.Item 
          dot={<ExperimentOutlined style={{ fontSize: '16px' }} />}
        >
          Added new chemical: Ethanol 500ml
          <p>2024-03-20 10:30</p>
        </Timeline.Item>
        <Timeline.Item 
          dot={<WarningOutlined style={{ fontSize: '16px' }} />}
          color="red"
        >
          Storage Warning: Acetone stock low
          <p>2024-03-20 09:15</p>
        </Timeline.Item>
        <Timeline.Item 
          dot={<CheckCircleOutlined style={{ fontSize: '16px' }} />}
          color="green"
        >
          Safety check completed
          <p>2024-03-20 09:00</p>
        </Timeline.Item>
      </Timeline>
    </Card>
  );
};

export default RecentActivities;