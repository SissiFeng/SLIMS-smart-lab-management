// frontend/src/pages/Analytics/index.tsx
import React, { useState } from 'react';
import { Card, Row, Col, Select, DatePicker, Button, Space } from 'antd';
import { DownloadOutlined, LineChartOutlined } from '@ant-design/icons';
import './index.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface AnalyticsData {
  id: string;
  type: string;
  period: string;
  status: string;
  generatedAt: string;
}

const Analytics: React.FC = () => {
  const [reportType, setReportType] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  return (
    <div className="main-content-wrapper">
      <div className="analytics-container">
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card title="Analytics Dashboard">
              <Space size="large" className="filter-container">
                <Select 
                  defaultValue="all" 
                  style={{ width: 200 }}
                  onChange={setReportType}
                >
                  <Option value="all">All Reports</Option>
                  <Option value="inventory">Inventory Analysis</Option>
                  <Option value="safety">Safety Analysis</Option>
                  <Option value="usage">Usage Trends</Option>
                </Select>
                <RangePicker 
                  style={{ width: 300 }}
                  onChange={(dates) => {
                    if (dates) {
                      setDateRange([
                        dates[0]?.toISOString() || '',
                        dates[1]?.toISOString() || ''
                      ]);
                    }
                  }}
                />
                <Button 
                  type="primary" 
                  icon={<LineChartOutlined />}
                >
                  Generate Analysis
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Analytics;