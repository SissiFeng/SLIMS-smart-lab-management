import React, { useState } from 'react';
import { Table, Card, Button, Space, Input, Select, Tag } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import StorageConditionTag from '../components/StorageConditionTag';
import ExpirationTag from '../components/ExpirationTag';
import AddAntibodyModal from './components/AddAntibodyModal';
import './index.scss';

interface AntibodyItem {
  id: string;
  name: string;
  type: 'Monoclonal' | 'Polyclonal';
  host: string;
  reactivity: string[];
  applications: string[];
  catalogNumber: string;
  concentration: string;
  storageTemp: number;
  expirationDate: string;
  openedDate?: string;
  location: string;
  status: 'Available' | 'Low' | 'Depleted';
}

const Antibodies: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const columns: ColumnsType<AntibodyItem> = [
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
      render: (type: string) => (
        <Tag color={type === 'Monoclonal' ? 'blue' : 'green'}>
          {type}
        </Tag>
      ),
    },
    {
      title: 'Applications',
      dataIndex: 'applications',
      key: 'applications',
      render: (applications: string[]) => (
        <>
          {applications.map(app => (
            <Tag key={app} color="blue">
              {app}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Host',
      dataIndex: 'host',
      key: 'host',
    },
    {
      title: 'Storage',
      dataIndex: 'storageTemp',
      key: 'storageTemp',
      render: (temp: number) => (
        <StorageConditionTag
          temperature={temp}
          type={temp <= -80 ? 'ultra-low' : temp <= -20 ? 'freezer' : 'refrigerator'}
          status="normal"
        />
      ),
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
        const color = {
          Available: 'success',
          Low: 'warning',
          Depleted: 'error'
        }[status];
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const data: AntibodyItem[] = [
    {
      id: '1',
      name: 'Anti-CD4 Antibody',
      type: 'Monoclonal',
      host: 'Mouse',
      reactivity: ['Human', 'Mouse'],
      applications: ['WB', 'FC', 'ICC'],
      catalogNumber: 'AB-12345',
      concentration: '1mg/mL',
      storageTemp: -20,
      expirationDate: '2025-03-01',
      location: 'Freezer-01-A3',
      status: 'Available'
    },
    {
      id: '2',
      name: 'Anti-GAPDH Antibody',
      type: 'Polyclonal',
      host: 'Rabbit',
      reactivity: ['Human', 'Mouse', 'Rat'],
      applications: ['WB', 'IHC'],
      catalogNumber: 'AB-12346',
      concentration: '0.5mg/mL',
      storageTemp: -20,
      expirationDate: '2024-12-15',
      location: 'Freezer-01-B2',
      status: 'Low'
    }
  ];

  return (
    <div className="antibodies-page">
      <Card title="Antibody Inventory">
        <Space className="table-actions" size="middle">
          <Input.Search
            placeholder="Search antibodies..."
            style={{ width: 300 }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            onChange={setFilterType}
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'monoclonal', label: 'Monoclonal' },
              { value: 'polyclonal', label: 'Polyclonal' },
            ]}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add Antibody
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
      <AddAntibodyModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default Antibodies; 