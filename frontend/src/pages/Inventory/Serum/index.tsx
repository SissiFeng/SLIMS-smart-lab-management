import React, { useState } from 'react';
import { Card, Table, Button, Space, Input, Select, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import StorageConditionTag from '../components/StorageConditionTag';
import './index.scss';

interface SerumItem {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  catalog_number: string;
  storage_temp: number;
  storage_location: string;
  lot_number: string;
  expiry_date: string;
  status: 'Available' | 'Low' | 'Depleted';
}

const Serum: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns: ColumnsType<SerumItem> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Restriction Enzyme', value: 'restriction' },
        { text: 'DNA Polymerase', value: 'polymerase' },
        { text: 'Ligase', value: 'ligase' },
      ],
    },
    {
      title: 'Manufacturer',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
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

  const mockData: SerumItem[] = [
    {
      id: '1',
      name: 'EcoRI',
      type: 'Restriction Enzyme',
      manufacturer: 'NEB',
      catalog_number: 'R0101',
      storage_temp: -20,
      storage_location: 'Box-E1',
      lot_number: 'L123456',
      expiry_date: '2025-12-31',
      status: 'Available',
    },
    // Add more mock data as needed
  ];

  return (
    <div className="serum-page">
      <Card title="Serum Inventory">
        <Space className="table-actions" size="middle">
          <Input.Search
            placeholder="Search serum..."
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
            Add Serum
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

export default Serum; 