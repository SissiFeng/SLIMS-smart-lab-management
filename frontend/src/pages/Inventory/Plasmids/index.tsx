import React, { useState } from 'react';
import { Table, Card, Button, Space, Input, Select, Tag, Tooltip, Badge } from 'antd';
import { PlusOutlined, SearchOutlined, AlertOutlined, HistoryOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import StorageConditionTag from '../components/StorageConditionTag';
import AddPlasmidModal from './components/AddPlasmidModal';
import PlasmidMapViewer from './components/PlasmidMapViewer';
import './index.scss';

interface PlasmidItem {
  id: string;
  name: string;
  vector: string;
  insert: string;
  size: number;
  resistance: string[];
  copy_number: 'High' | 'Medium' | 'Low';
  storage_location: string;
  storage_temp: number;
  concentration: number;
  creation_date: string;
  last_validation: string;
  sequence_verified: boolean;
  status: 'Available' | 'Low' | 'Depleted';
  usage_frequency: number;
  recommended_growth: {
    strain: string;
    temperature: number;
    antibiotics: string[];
  };
}

const Plasmids: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlasmid, setSelectedPlasmid] = useState<PlasmidItem | null>(null);
  const [isMapVisible, setIsMapVisible] = useState(false);

  const columns: ColumnsType<PlasmidItem> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          {text}
          {record.alerts && record.alerts.length > 0 && (
            <Tooltip title={record.alerts.map(a => a.message).join('\n')}>
              <Badge dot>
                <AlertOutlined style={{ color: '#ff4d4f' }} />
              </Badge>
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: 'Vector',
      dataIndex: 'vector',
      key: 'vector',
      filters: [
        { text: 'pUC19', value: 'pUC19' },
        { text: 'pBR322', value: 'pBR322' },
        { text: 'pET28a', value: 'pET28a' },
      ],
    },
    {
      title: 'Size (kb)',
      dataIndex: 'size',
      key: 'size',
      sorter: (a, b) => a.size - b.size,
    },
    {
      title: 'Resistance',
      dataIndex: 'resistance',
      key: 'resistance',
      render: (resistances: string[]) => (
        <>
          {resistances.map(r => (
            <Tag key={r} color="blue">{r}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Storage',
      dataIndex: 'storage_temp',
      key: 'storage',
      render: (temp, record) => (
        <Space>
          <StorageConditionTag temperature={temp} />
          <Tooltip title={`Location: ${record.storage_location}`}>
            <span>{record.storage_location}</span>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Validation',
      key: 'validation',
      render: (_, record) => (
        <Space>
          {record.sequence_verified ? (
            <Tag color="success">Verified</Tag>
          ) : (
            <Tag color="warning">Pending</Tag>
          )}
          <Tooltip title={`Last validated: ${record.last_validation}`}>
            <HistoryOutlined />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Usage',
      key: 'usage',
      render: (_, record) => {
        const recommendations = record.recommended_growth;
        return (
          <Tooltip title={
            <>
              <p>Recommended strain: {recommendations.strain}</p>
              <p>Growth temp: {recommendations.temperature}°C</p>
              <p>Antibiotics: {recommendations.antibiotics.join(', ')}</p>
            </>
          }>
            <Tag color={record.usage_frequency > 5 ? 'green' : 'blue'}>
              Used {record.usage_frequency} times
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = {
          'Available': 'success',
          'Low': 'warning',
          'Depleted': 'error',
        }[status];
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const data: PlasmidItem[] = [
    {
      id: '1',
      name: 'pLenti-CMV-GFP',
      vector: 'pLenti',
      insert: 'GFP',
      size: 8.5,
      resistance: ['Ampicillin', 'Puromycin'],
      copy_number: 'High',
      storage_location: 'Box-01-A1',
      storage_temp: -20,
      concentration: 1.2,
      creation_date: '2024-01-15',
      last_validation: '2024-02-15',
      sequence_verified: true,
      status: 'Available',
      usage_frequency: 8,
      recommended_growth: {
        strain: 'DH5α',
        temperature: 37,
        antibiotics: ['Ampicillin']
      }
    },
    {
      id: '2',
      name: 'pET28a-His-TEV',
      vector: 'pET28a',
      insert: 'His-TEV',
      size: 5.4,
      resistance: ['Kanamycin'],
      copy_number: 'Medium',
      storage_location: 'Box-02-B3',
      storage_temp: -20,
      concentration: 0.8,
      creation_date: '2024-01-01',
      last_validation: '2024-01-20',
      sequence_verified: true,
      status: 'Low',
      usage_frequency: 3,
      recommended_growth: {
        strain: 'BL21(DE3)',
        temperature: 37,
        antibiotics: ['Kanamycin']
      }
    },
    {
      id: '3',
      name: 'pcDNA3.1-FLAG-EGFP',
      vector: 'pcDNA3.1',
      insert: 'FLAG-EGFP',
      size: 6.2,
      resistance: ['Ampicillin', 'Neomycin'],
      copy_number: 'High',
      storage_location: 'Box-01-C4',
      storage_temp: -20,
      concentration: 1.5,
      creation_date: '2024-02-01',
      last_validation: '2024-03-01',
      sequence_verified: false,
      status: 'Available',
      usage_frequency: 2,
      recommended_growth: {
        strain: 'DH5α',
        temperature: 37,
        antibiotics: ['Ampicillin']
      }
    }
  ];

  return (
    <div className="plasmids-page">
      <Card title="Plasmids Inventory">
        <Space className="table-actions" size="middle">
          <Input.Search
            placeholder="Search plasmids..."
            style={{ width: 300 }}
            allowClear
          />
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            options={[
              { value: 'all', label: 'All Plasmids' },
              { value: 'verified', label: 'Verified Only' },
              { value: 'needs_validation', label: 'Needs Validation' },
              { value: 'low_stock', label: 'Low Stock' },
            ]}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add Plasmid
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedPlasmid(record);
              setIsMapVisible(true);
            },
          })}
        />
      </Card>
      
      <AddPlasmidModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => setIsModalVisible(false)}
      />
      
      <PlasmidMapViewer
        visible={isMapVisible}
        plasmid={selectedPlasmid}
        onClose={() => setIsMapVisible(false)}
      />
    </div>
  );
};

export default Plasmids; 