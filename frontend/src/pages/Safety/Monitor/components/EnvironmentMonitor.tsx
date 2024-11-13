import React from 'react';
import { Card, Row, Col, Statistic, Badge, Progress, Tag, Alert } from 'antd';
import { Line } from '@ant-design/plots';
import { SafetyCertificateOutlined, AlertOutlined } from '@ant-design/icons';

interface EnvironmentReading {
  zone: string;
  parameter: string;
  value: number;
  timestamp: string;
}

const EnvironmentMonitor: React.FC = () => {
  // 图表数据保持不变
  const data = [
    { time: '2024-03-10 10:00', value: 22.5, type: 'Temperature' },
    { time: '2024-03-10 10:05', value: 22.7, type: 'Temperature' },
  ];

  const config = {
    data,
    xField: 'time',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  };

  return (
    <div className="environment-monitor">
      <Alert 
        message="All Systems Operating Normally" 
        type="success" 
        showIcon 
        className="mb-4"
      />
      
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card title="Environmental Controls" className="monitor-card">
            <div className="readings-grid">
              <div className="parameter-card">
                <div className="parameter-label">Temperature</div>
                <div className="parameter-value">22.5°C</div>
                <div className="parameter-status">Normal</div>
              </div>
              <div className="parameter-card">
                <div className="parameter-label">Humidity</div>
                <div className="parameter-value">45%</div>
                <div className="parameter-status">Normal</div>
              </div>
              <div className="parameter-card">
                <div className="parameter-label">Laboratory Pressure</div>
                <div className="parameter-value">-25 Pa</div>
                <Tag color="success">Normal</Tag>
              </div>
              <div className="parameter-card">
                <div className="parameter-label">Air Changes/Hour</div>
                <div className="parameter-value">12 ACH</div>
                <Tag color="processing">Optimal</Tag>
              </div>
              <div className="parameter-card full-width">
                <div className="parameter-label">HEPA Filter Status</div>
                <Progress percent={82} size="small" />
              </div>
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Critical Equipment" className="monitor-card">
            <div className="readings-grid">
              <div className="parameter-card">
                <div className="parameter-label">BSC Status</div>
                <Tag color="success">Normal</Tag>
                <div className="parameter-status">Airflow: 0.5 m/s</div>
              </div>
              <div className="parameter-card">
                <div className="parameter-label">Autoclave</div>
                <Tag color="success">Available</Tag>
                <div className="parameter-status">Last Check: 2h ago</div>
              </div>
              <div className="parameter-card">
                <div className="parameter-label">-80°C Freezer</div>
                <div className="parameter-value">-82.3°C</div>
                <Tag color="success">Normal</Tag>
              </div>
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Gas Monitoring" className="monitor-card">
            <div className="readings-grid">
              <div className="parameter-card">
                <div className="parameter-label">O2 Level</div>
                <div className="parameter-value">20.9%</div>
                <Tag color="success">Normal</Tag>
              </div>
              <div className="parameter-card">
                <div className="parameter-label">CO2 Level</div>
                <div className="parameter-value">5.0%</div>
                <Tag color="success">Normal</Tag>
              </div>
              <div className="parameter-card">
                <div className="parameter-label">CO Level</div>
                <div className="parameter-value">0 PPM</div>
                <Tag color="success">Safe</Tag>
              </div>
              <div className="parameter-card">
                <div className="parameter-label">VOC Level</div>
                <div className="parameter-value">0.1 PPM</div>
                <Tag color="success">Safe</Tag>
              </div>
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Safety Systems" className="monitor-card">
            <div className="readings-grid">
              <div className="parameter-card">
                <div className="parameter-label">Emergency Shower</div>
                <Tag color="success">Operational</Tag>
              </div>
              <div className="parameter-card">
                <div className="parameter-label">Fire System</div>
                <Tag color="success">Active</Tag>
              </div>
              <div className="parameter-card">
                <div className="parameter-label">Emergency Power</div>
                <Tag color="success">Standby</Tag>
              </div>
              <div className="parameter-card full-width">
                <div className="parameter-label">Waste Management</div>
                <div style={{ marginTop: 8 }}>
                  <div>Biohazard Waste</div>
                  <Progress percent={45} size="small" />
                  <div style={{ marginTop: 8 }}>Chemical Waste</div>
                  <Progress percent={30} size="small" />
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="Environmental Trends" style={{ marginTop: 24 }}>
        <div style={{ height: 300 }}>
          <Line {...config} />
        </div>
      </Card>
    </div>
  );
};

export default EnvironmentMonitor; 