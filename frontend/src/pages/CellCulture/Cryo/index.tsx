import React from 'react';
import { Card, Table, Button, Row, Col, Select, DatePicker, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.scss';

const { Option } = Select;

const Cryopreservation: React.FC = () => {
  const columns = [
    {
      title: 'Cell Line',
      dataIndex: 'cellLine',
      key: 'cellLine',
    },
    {
      title: 'Passage Number',
      dataIndex: 'passage',
      key: 'passage',
    },
    {
      title: 'Freezing Date',
      dataIndex: 'freezingDate',
      key: 'freezingDate',
    },
    {
      title: 'Viability',
      dataIndex: 'viability',
      key: 'viability',
      render: (viability: number) => (
        <Tag color={viability >= 90 ? 'green' : viability >= 80 ? 'orange' : 'red'}>
          {viability}%
        </Tag>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
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
        <Tag color={status === 'Active' ? 'green' : 'default'}>
          {status}
        </Tag>
      ),
    },
  ];

  const mockData = [
    {
      key: '1',
      cellLine: 'HEK293T',
      passage: 'P15',
      freezingDate: '2024-03-01',
      viability: 95,
      location: 'LN2-01-A3',
      operator: 'John Doe',
      status: 'Active',
    },
    {
      key: '2',
      cellLine: 'Jurkat',
      passage: 'P8',
      freezingDate: '2024-02-28',
      viability: 92,
      location: 'LN2-01-B2',
      operator: 'Jane Smith',
      status: 'Active',
    },
  ];

  return (
    <div className="cryo-page">
      <Card title="Cryopreservation Records">
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
              <Option value="active">Active</Option>
              <Option value="used">Used</Option>
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
          className="cryo-table"
        />
      </Card>
    </div>
  );
};

export default Cryopreservation; 