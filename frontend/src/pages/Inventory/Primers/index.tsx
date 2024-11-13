import React, { useState } from 'react';
import { Card, Table, Button, Space, Input, Select, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import StorageConditionTag from '../components/StorageConditionTag';
import './index.scss';

interface PrimerItem {
  id: string;
  name: string;
  sequence: string;
  length: number;
  tm: number;
  gc_content: number;
  storage_temp: number;
  storage_location: string;
  concentration: string;
  status: 'Available' | 'Low' | 'Depleted';
}

const Primers: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns: ColumnsType<PrimerItem> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Sequence',
      dataIndex: 'sequence',
      key: 'sequence',
    },
    {
      title: 'Properties',
      key: 'properties',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <span>Length: {record.length}bp</span>
          <span>Tm: {record.tm}°C</span>
          <span>GC: {record.gc_content}%</span>
        </Space>
      ),
    },
    {
      title: 'Storage',
      key: 'storage',
      render: (_, record) => (
        <Space>
          <StorageConditionTag temperature={record.storage_temp} />
          <span>{record.storage_location}</span>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        const color = 
          record.status === 'Available' ? 'success' :
          record.status === 'Low' ? 'warning' : 'error';
        return <Tag color={color}>{record.status}</Tag>;
      },
    },
  ];

  const mockData: PrimerItem[] = [
    {
      id: '1',
      name: 'GFP-F',
      sequence: 'ATGGTGAGCAAGGGCGAGGAG',
      length: 21,
      tm: 64.5,
      gc_content: 61.9,
      storage_temp: -20,
      storage_location: 'Box-P1-A1',
      concentration: '100 μM',
      status: 'Available',
    },
    {
      id: '2',
      name: 'GFP-R',
      sequence: 'TTACTTGTACAGCTCGTCCATGC',
      length: 23,
      tm: 62.8,
      gc_content: 47.8,
      storage_temp: -20,
      storage_location: 'Box-P1-A2',
      concentration: '100 μM',
      status: 'Available',
    },
    {
      id: '3',
      name: 'His-Tag-F',
      sequence: 'CACCATCACCATCACCAC',
      length: 18,
      tm: 58.2,
      gc_content: 55.6,
      storage_temp: -20,
      storage_location: 'Box-P1-B1',
      concentration: '100 μM',
      status: 'Low',
    }
  ];

  return (
    <div className="primers-page">
      <Card title="Primers Inventory">
        <Space className="table-actions" size="middle">
          <Input.Search
            placeholder="Search primers..."
            style={{ width: 300 }}
            allowClear
          />
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'available', label: 'Available' },
              { value: 'low', label: 'Low Stock' },
              { value: 'depleted', label: 'Depleted' },
            ]}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add Primer
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Primers; 