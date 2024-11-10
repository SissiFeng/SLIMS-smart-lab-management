import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import './index.scss';

interface ChemicalItem {
  id: string;
  name: string;
  cas: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  status: 'Normal' | 'Low' | 'Critical';
}

const InventoryList: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const columns: ColumnsType<ChemicalItem> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'CAS No.',
      dataIndex: 'cas',
      key: 'cas',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Acids', value: 'Acids' },
        { text: 'Bases', value: 'Bases' },
        { text: 'Salts', value: 'Salts' },
        { text: 'Organic', value: 'Organic' },
        { text: 'Solvents', value: 'Solvents' },
      ],
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: true,
      render: (text, record) => `${text} ${record.unit}`,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'Normal' ? 'green' : status === 'Low' ? 'orange' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  // Sample data
  const data: ChemicalItem[] = [
    {
      id: '1',
      name: 'Hydrochloric Acid',
      cas: '7647-01-0',
      category: 'Acids',
      quantity: 5,
      unit: 'L',
      location: 'Cabinet A-1',
      status: 'Normal',
    },
    // Add more sample data as needed
  ];

  return (
    <div className="inventory-list">
      <div className="header-actions">
        <Input.Search
          placeholder="Search chemicals..."
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />}>
          Add Chemical
        </Button>
      </div>
      <Table<ChemicalItem>
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          total: data.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </div>
  );
};

export default InventoryList;
