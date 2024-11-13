import React from 'react';
import { Card, Table, Button, Row, Col, Select, DatePicker, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.scss';

const { Option } = Select;

const ThawingRecords: React.FC = () => {
  const columns = [
    {
      title: 'Cell Line',
      dataIndex: 'cellLine',
      key: 'cellLine',
    },
    {
      title: 'Vial ID',
      dataIndex: 'vialId',
      key: 'vialId',
    },
    {
      title: 'Thawing Date',
      dataIndex: 'thawingDate',
      key: 'thawingDate',
    },
    {
      title: 'Post-thaw Viability',
      dataIndex: 'viability',
      key: 'viability',
      render: (viability: number) => (
        <Tag color={viability >= 90 ? 'green' : viability >= 80 ? 'orange' : 'red'}>
          {viability}%
        </Tag>
      ),
    },
    {
      title: 'Recovery Time',
      dataIndex: 'recoveryTime',
      key: 'recoveryTime',
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Success' ? 'green' : status === 'In Progress' ? 'blue' : 'red'}>
          {status}
        </Tag>
      ),
    },
  ];

  const mockData = [
    {
      key: '1',
      cellLine: 'HEK293T',
      vialId: 'HEK-001',
      thawingDate: '2024-03-01',
      viability: 92,
      recoveryTime: '24h',
      operator: 'John Doe',
      status: 'Success',
    },
    {
      key: '2',
      cellLine: 'Jurkat',
      vialId: 'JUR-002',
      thawingDate: '2024-02-28',
      viability: 88,
      recoveryTime: '48h',
      operator: 'Jane Smith',
      status: 'In Progress',
    },
  ];

  return (
    <div className="thawing-page">
      <Card title="Thawing Records">
        <Row gutter={[16, 16]} className="filter-row">
          <Col span={6}>
            <Select placeholder="Select Cell Line" style={{ width: '100%' }}>
              <Option value="hek293t">HEK293T</Option>
              <Option value="jurkat">Jurkat</Option>
              <Option value="mcf7">MCF7</Option>
            </Select>
          </Col>
          <Col span={6}>
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Col>
          <Col span={6}>
            <Select placeholder="Status" style={{ width: '100%' }}>
              <Option value="all">All Status</Option>
              <Option value="success">Success</Option>
              <Option value="in-progress">In Progress</Option>
              <Option value="failed">Failed</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Button type="primary" icon={<PlusOutlined />}>
              New Record
            </Button>
          </Col>
        </Row>
        <Table 
          columns={columns} 
          dataSource={mockData}
          className="thawing-table"
        />
      </Card>
    </div>
  );
};

export default ThawingRecords; 