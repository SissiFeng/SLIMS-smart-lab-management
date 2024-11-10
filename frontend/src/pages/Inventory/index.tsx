// src/pages/Inventory/index.tsx
import React, { useState } from 'react';
import { Input, Table, Button, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import './index.scss';

interface ChemicalItem {
  id: string;
  name: string;
  cas: string;
  category: string;
  location: string;
  quantity: number;
  unit: string;
  status: string;
}

const Inventory: React.FC = () => {
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
        { text: 'Acids', value: 'acids' },
        { text: 'Bases', value: 'bases' },
        { text: 'Salts', value: 'salts' },
        { text: 'Organic', value: 'organic' },
        { text: 'Solvents', value: 'solvents' },
      ],
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div className="main-content-wrapper">
      <div className="search-container">
        <Input.Search 
          placeholder="Search chemicals..." 
          style={{ width: 300 }} 
        />
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
        >
          Add Chemical
        </Button>
      </div>
    </div>
  );
};

export default Inventory;