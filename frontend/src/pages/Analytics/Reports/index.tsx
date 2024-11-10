// src/pages/Analytics/Reports/index.tsx
import React from 'react';
import { Card, Table, DatePicker, Select, Button, Row, Col } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './index.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Reports: React.FC = () => {
  const columns = [
    {
      title: 'Report Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Generated Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button type="link" icon={<DownloadOutlined />}>
          Download
        </Button>
      ),
    },
  ];

  const mockData = [
    {
      key: '1',
      name: 'Monthly Inventory Report',
      type: 'Inventory',
      date: '2024-03-01',
      status: 'Completed',
    },
    {
      key: '2',
      name: 'Safety Compliance Report',
      type: 'Safety',
      date: '2024-03-01',
      status: 'Completed',
    },
  ];

  return (
    <div className="reports-page">
      <Card title="Reports">
        <Row gutter={[16, 16]} className="filter-row">
          <Col span={8}>
            <RangePicker style={{ width: '100%' }} />
          </Col>
          <Col span={6}>
            <Select defaultValue="all" style={{ width: '100%' }}>
              <Option value="all">All Types</Option>
              <Option value="inventory">Inventory</Option>
              <Option value="safety">Safety</Option>
              <Option value="usage">Usage</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Button type="primary">Generate Report</Button>
          </Col>
        </Row>
        <Table 
          columns={columns} 
          dataSource={mockData} 
          className="reports-table"
        />
      </Card>
    </div>
  );
};

export default Reports;