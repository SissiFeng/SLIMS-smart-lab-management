import React, { useState } from 'react';
import { Table, Card, Button, Space, Input, Select, Tag } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import StorageConditionTag from '../components/StorageConditionTag';
import BioSafetyLevelTag from '../components/BioSafetyLevelTag';
import AddCellLineModal from './components/AddCellLineModal';
import './index.scss';

interface CellLineItem {
  id: string;
  name: string;
  type: string;
  origin: string;
  bsl: 1 | 2 | 3 | 4;
  passage: number;
  culture_medium: string;
  storage_location: string;
  storage_temp: number;
  mycoplasma_test: 'Positive' | 'Negative' | 'Not Tested';
  authentication: 'Verified' | 'Pending' | 'Not Verified';
  status: 'Available' | 'Low Passage' | 'Contaminated' | 'Depleted';
  last_passage_date?: string;
  notes?: string;
}

const CellLines: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // 示例数据
  const data: CellLineItem[] = [
    {
      id: '1',
      name: 'HEK293T',
      type: 'Adherent',
      origin: 'Human Embryonic Kidney',
      bsl: 2,
      passage: 15,
      culture_medium: 'DMEM + 10% FBS',
      storage_location: 'LN2-01-A3',
      storage_temp: -196,
      mycoplasma_test: 'Negative',
      authentication: 'Verified',
      status: 'Available',
      last_passage_date: '2024-03-01'
    },
    {
      id: '2',
      name: 'Jurkat',
      type: 'Suspension',
      origin: 'Human T Lymphocyte',
      bsl: 2,
      passage: 8,
      culture_medium: 'RPMI + 10% FBS',
      storage_location: 'LN2-01-B2',
      storage_temp: -196,
      mycoplasma_test: 'Negative',
      authentication: 'Verified',
      status: 'Available',
      last_passage_date: '2024-02-28'
    },
    {
      id: '3',
      name: 'MCF7',
      type: 'Adherent',
      origin: 'Human Breast Cancer',
      bsl: 2,
      passage: 20,
      culture_medium: 'DMEM + 10% FBS',
      storage_location: 'LN2-02-A1',
      storage_temp: -196,
      mycoplasma_test: 'Not Tested',
      authentication: 'Pending',
      status: 'Low Passage',
      last_passage_date: '2024-02-15'
    }
  ];

  const columns: ColumnsType<CellLineItem> = [
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
        { text: 'Adherent', value: 'Adherent' },
        { text: 'Suspension', value: 'Suspension' },
      ],
    },
    {
      title: 'BSL',
      dataIndex: 'bsl',
      key: 'bsl',
      render: (bsl) => <BioSafetyLevelTag level={bsl} />,
    },
    {
      title: 'Passage',
      dataIndex: 'passage',
      key: 'passage',
    },
    {
      title: 'Storage',
      dataIndex: 'storage_temp',
      key: 'storage',
      render: (temp) => <StorageConditionTag temperature={temp} />,
    },
    {
      title: 'Mycoplasma',
      dataIndex: 'mycoplasma_test',
      key: 'mycoplasma',
      render: (status) => {
        const color = {
          'Negative': 'success',
          'Positive': 'error',
          'Not Tested': 'warning',
        }[status];
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Authentication',
      dataIndex: 'authentication',
      key: 'authentication',
      render: (status) => {
        const color = {
          'Verified': 'success',
          'Pending': 'processing',
          'Not Verified': 'warning',
        }[status];
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = {
          'Available': 'success',
          'Low Passage': 'warning',
          'Contaminated': 'error',
          'Depleted': 'default',
        }[status];
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="cell-lines-page">
      <Card title="Cell Lines Inventory">
        <Space className="table-actions" size="middle">
          <Input.Search
            placeholder="Search cell lines..."
            style={{ width: 300 }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            onChange={setFilterType}
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'adherent', label: 'Adherent' },
              { value: 'suspension', label: 'Suspension' },
            ]}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add Cell Line
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
      <AddCellLineModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default CellLines; 