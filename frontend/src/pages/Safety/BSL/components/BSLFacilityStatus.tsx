import React from 'react';
import { Card, Row, Col, Statistic, Badge, Space, Tag } from 'antd';
import { SafetyCertificateOutlined, AlertOutlined } from '@ant-design/icons';

const BSLFacilityStatus: React.FC = () => {
  return (
    <Card title="BSL Facility Status">
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Current BSL Level"
              value="BSL-2"
              prefix={<SafetyCertificateOutlined />}
            />
            <Tag color="green" style={{ marginTop: 16 }}>Active</Tag>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Air Changes/Hour"
              value={12}
              suffix="/hr"
            />
            <Badge status="success" text="Normal" style={{ marginTop: 16 }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Negative Pressure"
              value={-0.05}
              suffix="inH₂O"
            />
            <Badge status="success" text="Within Range" style={{ marginTop: 16 }} />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default BSLFacilityStatus; 