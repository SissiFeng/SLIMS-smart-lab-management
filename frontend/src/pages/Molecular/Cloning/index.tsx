import React, { useState } from 'react';
import { Card, Table, Button, Row, Col, Select, DatePicker, Tag, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import './index.scss';

const { Option } = Select;

interface CloningRecord {
  id: string;
  name: string;
  insert: string;
  vector: string;
  method: string;
  date: string;
  status: string;
  operator: string;
  verification: string;
}

const CloningRecords: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns: ColumnsType<CloningRecord> = [
    {
      title: 'Construct Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Insert',
      dataIndex: 'insert',
      key: 'insert',
    },
    {
      title: 'Vector',
      dataIndex: 'vector',
      key: 'vector',
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={
          status === 'Successful' ? 'green' :
          status === 'Failed' ? 'red' :
          'orange'
        }>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: 'Verification',
      dataIndex: 'verification',
      key: 'verification',
      render: (verification: string) => (
        <Tag color={
          verification === 'Verified' ? 'green' :
          verification === 'Failed' ? 'red' :
          'orange'
        }>
          {verification}
        </Tag>
      ),
    },
  ];

  const mockData: CloningRecord[] = [
    {
      id: '1',
      name: 'pCMV-GFP-T2A-Puro',
      insert: 'GFP',
      vector: 'pCMV',
      method: 'Gibson Assembly',
      date: '2024-03-01',
      status: 'Successful',
      operator: 'John Doe',
      verification: 'Verified',
    },
    {
      id: '2',
      name: 'pLenti-mCherry',
      insert: 'mCherry',
      vector: 'pLenti',
      method: 'Restriction Digest',
      date: '2024-02-28',
      status: 'In Progress',
      operator: 'Jane Smith',
      verification: 'Pending',
    },
  ];

  return (
    <div className="cloning-records-page">
      <Card title="Cloning Records">
        <Row gutter={[16, 16]} className="filter-row">
          <Col span={6}>
            <Select placeholder="Select Method" style={{ width: '100%' }}>
              <Option value="gibson">Gibson Assembly</Option>
              <Option value="restriction">Restriction Digest</Option>
              <Option value="gateway">Gateway Cloning</Option>
              <Option value="goldengate">Golden Gate</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select placeholder="Status" style={{ width: '100%' }}>
              <Option value="all">All Status</Option>
              <Option value="successful">Successful</Option>
              <Option value="failed">Failed</Option>
              <Option value="in-progress">In Progress</Option>
            </Select>
          </Col>
          <Col span={6}>
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              New Record
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          className="cloning-table"
        />
      </Card>
    </div>
  );
};

export default CloningRecords; 