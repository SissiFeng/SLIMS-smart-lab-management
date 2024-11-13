import React, { useState } from 'react';
import { Card, Table, Button, Space, Input, Tag, Row, Col } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import PlasmidMapViewer from './components/PlasmidMapViewer';
import AddPlasmidModal from './components/AddPlasmidModal';
import type { Plasmid } from './types';
import './index.scss';

const { Search } = Input;

const PlasmidMaps: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlasmid, setSelectedPlasmid] = useState<Plasmid | null>(null);
  const [isMapVisible, setIsMapVisible] = useState(false);

  const mockData: Plasmid[] = [
    {
      id: '1',
      name: 'pET28a-GFP',
      vector: 'pET28a',
      size: 5.4,
      resistance: ['Kanamycin'],
      features: ['T7 promoter', 'GFP'],
      sequence: 'ATCG...',
      created_at: '2024-03-15',
      created_by: 'John Doe',
      description: 'GFP expression vector',
      copy_number: 'High',
      notes: 'Verified by sequencing'
    },
    {
      id: '2',
      name: 'pUC19-RFP',
      vector: 'pUC19',
      size: 4.8,
      resistance: ['Ampicillin'],
      features: ['lac promoter', 'RFP'],
      sequence: 'GCTA...',
      created_at: '2024-03-14',
      created_by: 'Jane Smith',
      description: 'RFP expression vector',
      copy_number: 'High',
      notes: 'Sequence verified'
    }
  ];

  const columns: ColumnsType<Plasmid> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Vector',
      dataIndex: 'vector',
      key: 'vector',
      filters: [
        { text: 'pUC19', value: 'pUC19' },
        { text: 'pET28a', value: 'pET28a' },
      ],
    },
    {
      title: 'Size (kb)',
      dataIndex: 'size',
      key: 'size',
      sorter: true,
    },
    {
      title: 'Resistance',
      dataIndex: 'resistance',
      key: 'resistance',
      render: (resistance: string[]) => (
        <>
          {resistance.map(r => (
            <Tag color="blue" key={r}>{r}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: true,
    },
  ];

  return (
    <div className="plasmid-maps-page">
      <Card title="Plasmid Maps">
        <Row gutter={[16, 16]} className="filter-row">
          <Col span={8}>
            <Search
              placeholder="Search plasmids"
              allowClear
              enterButton={<SearchOutlined />}
            />
          </Col>
          <Col span={16} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              New Plasmid
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => {
              setSelectedPlasmid(record);
              setIsMapVisible(true);
            },
            style: { cursor: 'pointer' }
          })}
        />
      </Card>

      <AddPlasmidModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />

      <PlasmidMapViewer
        visible={isMapVisible}
        plasmid={selectedPlasmid}
        onClose={() => {
          setIsMapVisible(false);
          setSelectedPlasmid(null);
        }}
      />
    </div>
  );
};

export default PlasmidMaps; 