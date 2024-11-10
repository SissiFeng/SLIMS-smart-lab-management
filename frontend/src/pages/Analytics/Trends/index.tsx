// src/pages/Analytics/Trends/index.tsx
import React from 'react';
import { Card, Row, Col, Select, DatePicker } from 'antd';
import { Line } from '@ant-design/plots';
import './index.scss';

const { Option } = Select;

const Trends: React.FC = () => {
  // Mock data for the line chart
  const data = [
    { date: '2024-01', value: 350, category: 'Usage' },
    { date: '2024-02', value: 400, category: 'Usage' },
    { date: '2024-03', value: 380, category: 'Usage' },
    // Add more mock data as needed
  ];

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  };

  return (
    <div className="trends-page">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Trend Analysis">
            <Row gutter={[16, 16]} className="filter-row">
              <Col span={6}>
                <Select defaultValue="usage" style={{ width: '100%' }}>
                  <Option value="usage">Chemical Usage</Option>
                  <Option value="stock">Stock Level</Option>
                  <Option value="safety">Safety Incidents</Option>
                </Select>
              </Col>
              <Col span={6}>
                <DatePicker.RangePicker style={{ width: '100%' }} />
              </Col>
            </Row>
            <div style={{ height: 400, marginTop: 20 }}>
              <Line {...config} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Trends;